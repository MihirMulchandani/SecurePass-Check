import React from 'react';
import { StrengthLevel } from '../types';
import { getStrengthColor, getStrengthTextColor } from '../utils/passwordLogic';

interface StrengthBarProps {
  score: number;
  maxScore: number;
  level: StrengthLevel;
}

export const StrengthBar: React.FC<StrengthBarProps> = ({ score, maxScore, level }) => {
  // Calculate percentage
  const percentage = Math.max(5, (score / maxScore) * 100);
  const barColor = getStrengthColor(level);
  const textColor = getStrengthTextColor(level);

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-bold text-black dark:text-white uppercase tracking-widest">
          Strength
        </span>
        <span className={`text-sm font-bold ${textColor} uppercase tracking-wider transition-colors duration-300`}>
          {level}
        </span>
      </div>
      <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};