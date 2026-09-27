export type ScreenTab = 'home' | 'transactions' | 'goals' | 'profile';

export interface Transaction {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  type: 'expense' | 'income';
  amount: number;
  date: string;
  time?: string;
  paymentMethod: string;
  note?: string;
}

export interface Goal {
  id: string;
  name: string;
  category: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  status: 'On Track' | 'Behind' | 'Completed';
  behindAmount?: number;
  monthlyContribution: number;
  estimatedCompletion: string;
  fundingAccount: string;
  colorType: 'primary' | 'tertiary' | 'secondary' | 'secondary-container';
}

export interface LinkedAccount {
  id: string;
  name: string;
  numberMasked: string;
  type: 'cash' | 'e-wallet' | 'bank';
  balance: number;
  isPrimary?: boolean;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  isPro: boolean;
  monthlyBudget: number;
  currency: string;
  budgetLimitWarnings: boolean;
  biometricLock: boolean;
}
