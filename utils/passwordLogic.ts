import { PasswordRule, PasswordAnalysis, StrengthLevel } from '../types';

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'length',
    label: 'Minimum 8 characters',
    validator: (pwd) => pwd.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Uppercase letter',
    validator: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 'lowercase',
    label: 'Lowercase letter',
    validator: (pwd) => /[a-z]/.test(pwd),
  },
  {
    id: 'number',
    label: 'Numeric digit',
    validator: (pwd) => /[0-9]/.test(pwd),
  },
  {
    id: 'special',
    label: 'Special character',
    validator: (pwd) => /[^A-Za-z0-9]/.test(pwd),
  },
];

export const analyzePassword = (password: string): PasswordAnalysis => {
  const ruleResults = PASSWORD_RULES.map((rule) => ({
    id: rule.id,
    passed: rule.validator(password),
  }));

  const passedCount = ruleResults.filter((r) => r.passed).length;
  
  let level = StrengthLevel.WEAK;
  if (passedCount >= 5) {
    level = StrengthLevel.STRONG;
  } else if (passedCount >= 3) {
    level = StrengthLevel.MEDIUM;
  }

  return {
    score: passedCount,
    maxScore: PASSWORD_RULES.length,
    level,
    ruleResults,
  };
};

export const getStrengthColor = (level: StrengthLevel): string => {
  switch (level) {
    case StrengthLevel.STRONG:
      return 'bg-black dark:bg-white';
    case StrengthLevel.MEDIUM:
      return 'bg-gray-500 dark:bg-gray-400'; 
    case StrengthLevel.WEAK:
    default:
      return 'bg-gray-300 dark:bg-gray-700';
  }
};

export const getStrengthTextColor = (level: StrengthLevel): string => {
  switch (level) {
    case StrengthLevel.STRONG:
      return 'text-black dark:text-white';
    case StrengthLevel.MEDIUM:
      return 'text-gray-600 dark:text-gray-300';
    case StrengthLevel.WEAK:
    default:
      return 'text-gray-400 dark:text-gray-500';
  }
};