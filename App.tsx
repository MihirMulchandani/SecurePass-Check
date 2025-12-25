import React, { useState, useMemo, useEffect } from 'react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthBar } from './components/StrengthBar';
import { RuleList } from './components/RuleList';
import { HistoryPanel } from './components/HistoryPanel';
import { analyzePassword } from './utils/passwordLogic';
import { ShieldCheckIcon, SunIcon, MoonIcon, SaveIcon } from './components/Icons';
import { HistoryItem } from './types';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('passwordHistory');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Persist history
  useEffect(() => {
    localStorage.setItem('passwordHistory', JSON.stringify(history));
  }, [history]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Analysis
  const analysis = useMemo(() => analyzePassword(password), [password]);

  // History Handlers
  const saveToHistory = () => {
    if (!password) return;
    
    // Create new item
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      password,
      timestamp: Date.now(),
      score: analysis.score,
      level: analysis.level
    };

    setHistory(prev => {
      // Avoid immediate duplicates
      if (prev.length > 0 && prev[0].password === password) return prev;
      // Keep last 10 items
      return [newItem, ...prev].slice(0, 10);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const restorePassword = (pwd: string) => {
    setPassword(pwd);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-8 transition-colors duration-300">
      <div className="w-full max-w-md flex flex-col h-full">
        
        {/* Modern Header */}
        <header className="flex items-center justify-between mb-12 mt-4">
          <div className="flex items-center gap-3">
             <div className="bg-black dark:bg-white p-2 rounded-lg">
                <ShieldCheckIcon className="w-6 h-6 text-white dark:text-black" />
             </div>
             <div>
                <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight">SecurePass</h1>
             </div>
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white text-black dark:text-white transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4 tracking-tighter">
              Check your<br/>strength.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Secure, client-side evaluation.
            </p>
          </div>

          <div className="flex gap-3 items-end mb-6">
            <div className="flex-grow">
               <PasswordInput 
                value={password} 
                onChange={setPassword} 
              />
            </div>
            <button
              onClick={saveToHistory}
              disabled={password.length === 0}
              className="h-[50px] w-[50px] flex items-center justify-center rounded-lg border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="Save"
            >
              <SaveIcon className="w-5 h-5" />
            </button>
          </div>

          <div className={`transition-all duration-500 overflow-hidden ${password.length > 0 ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'}`}>
              <StrengthBar 
                score={analysis.score} 
                maxScore={analysis.maxScore} 
                level={analysis.level} 
              />
          </div>

          <div className="my-8 h-px bg-gray-200 dark:bg-gray-800 w-full" />

          <RuleList results={analysis.ruleResults} />

          <HistoryPanel 
            history={history} 
            onRestore={restorePassword}
            onClear={clearHistory}
          />
        </main>
        
        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-gray-100 dark:border-gray-900 text-center">
          <p className="text-xs font-mono text-gray-400 dark:text-gray-600">
             ©MihirMulchandani • 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;