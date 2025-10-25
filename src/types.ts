type StatusType = 'paid' | 'pending' | 'draft';
type ThemeType = 'light' | 'dark';

export interface Invoice {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: StatusType;
}