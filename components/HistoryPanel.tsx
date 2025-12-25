import React from 'react';
import { HistoryItem } from '../types';
import { ClockIcon, TrashIcon, ArrowPathIcon } from './Icons';
import { getStrengthTextColor } from '../utils/passwordLogic';

interface HistoryPanelProps {
  history: HistoryItem[];
  onRestore: (password: string) => void;
  onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 pt-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Recent Scans
        </h3>
        <button
          onClick={onClear}
          className="text-xs font-bold text-gray-400 hover:text-black dark:hover:text-white uppercase tracking-wider transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-200"
          >
            <div className="flex flex-col flex-1 mr-3 overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold font-mono text-black dark:text-white truncate">
                  {item.password.length > 3 
                    ? item.password.substring(0, 2) + '•'.repeat(Math.min(item.password.length - 2, 8)) 
                    : '•••'}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${getStrengthTextColor(item.level)}`}>
                  {item.level}
                </span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
            
            <button
              onClick={() => onRestore(item.password)}
              className="p-2 rounded-md text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              title="Analyze again"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};