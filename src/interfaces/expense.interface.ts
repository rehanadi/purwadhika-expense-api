export interface Expense {
  id?: string;
  name: string;
  nominal: number;
  category: string;
  date?: Date;
}
