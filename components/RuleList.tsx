import React from 'react';
import { PASSWORD_RULES } from '../utils/passwordLogic';
import { RuleResult } from '../types';
import { CheckIcon, XIcon } from './Icons';

interface RuleListProps {
  results: RuleResult[];
}

export const RuleList: React.FC<RuleListProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-1 gap-3">
        {PASSWORD_RULES.map((rule) => {
          const result = results.find((r) => r.id === rule.id);
          const isPassed = result?.passed ?? false;

          return (
            <li 
              key={rule.id} 
              className="flex items-center text-sm group"
            >
              <div 
                className={`flex items-center justify-center w-6 h-6 mr-3 rounded-full border-2 transition-all duration-300
                  ${isPassed 
                    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' 
                    : 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 bg-transparent'
                  }`}
              >
                {isPassed ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-800" />
                )}
              </div>
              
              <span className={`font-medium transition-colors duration-300 ${isPassed ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};