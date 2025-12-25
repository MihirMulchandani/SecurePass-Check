export enum StrengthLevel {
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

export interface PasswordRule {
  id: string;
  label: string;
  validator: (password: string) => boolean;
}

export interface RuleResult {
  id: string;
  passed: boolean;
}

export interface PasswordAnalysis {
  score: number; // 0 to 5
  maxScore: number;
  level: StrengthLevel;
  ruleResults: RuleResult[];
}

export interface HistoryItem {
  id: string;
  password: string;
  timestamp: number;
  score: number;
  level: StrengthLevel;
}