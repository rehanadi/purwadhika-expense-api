import type { Expense } from "../interfaces/expense.interface";
import { 
  getExpensesQuery, 
  getExpenseQuery, 
  getTotalExpenseQuery,
  createExpenseQuery, 
  updateExpenseQuery, 
  deleteExpenseQuery 
} from "../queries/expense.query";

async function getExpensesAction(): Promise<Expense[]> {
  try {
    const data: Expense[] = await getExpensesQuery();
    return data;
  } catch (err) {
    throw err;    
  }
}

async function getExpenseAction(id: string): Promise<Expense> {
  try {
    const data: Expense = await getExpenseQuery(id);
    return data;
  } catch (err) {
    throw err;    
  }
}

async function getTotalExpenseAction(filters: {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<{ total: number }> {
  try {
    const data: { total: number } = await getTotalExpenseQuery(filters);
    return data;
  } catch (err) {
    throw err;
  }
}

async function createExpenseAction({
  name,
  nominal,
  category
}: Expense): Promise<Expense> {
  try {
    if (!name || !nominal || !category) throw new Error("Please fill in name, nominal and category")
    if (nominal < 0) throw new Error("Please input correct nominal");

    const data: Expense = await createExpenseQuery({ name, nominal, category });
    return data;
  } catch (err) {
    throw err;
  }
}

async function updateExpenseAction(
  id: string, 
  params: {
    name?: string, 
    nominal?: number, 
    category?: string,
    date?: string 
  }
): Promise<Expense> {
  try {
    if (params.nominal && params.nominal < 0) throw new Error("Please input correct nominal");

    const data: Expense = await updateExpenseQuery(id, params);
    return data;
  } catch (err) {
    throw err;
  }
}

async function deleteExpenseAction(id: string): Promise<Expense> {
  try {
    const data: Expense = await deleteExpenseQuery(id);
    return data;
  } catch (err) {
    throw err;
  }
}

export { 
  getExpensesAction, 
  getExpenseAction, 
  getTotalExpenseAction,
  createExpenseAction,
  updateExpenseAction,
  deleteExpenseAction
};