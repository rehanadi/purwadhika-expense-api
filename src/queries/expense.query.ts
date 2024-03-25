import axios from "axios";
import type { Expense } from "../interfaces/expense.interface";
import { JSON_SERVER_URL } from "../config";

async function getExpensesQuery(): Promise<Expense[]> {
  try {
    const { data }: { data: Expense[] } = await axios.get(`${JSON_SERVER_URL}/expenses`);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getExpenseQuery(id: string): Promise<Expense> {
  try {
    const { data }: { data: Expense } = await axios.get(`${JSON_SERVER_URL}/expenses/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
}

async function getTotalExpenseQuery({
  category,
  dateFrom,
  dateTo
}: {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<{ total: number }> {
  try {
    let url = `${JSON_SERVER_URL}/expenses`;
    
    if (category) url += `?category=${category}`;
    if (dateFrom && dateTo) url += `?date_gte=${dateFrom}&date_lte=${dateTo}`;

    console.log(url);

    const { data }: { data: Expense[] } = await axios.get(url);
    const total = data.reduce((acc, expense) => acc + expense.nominal, 0);

    return { total };
  } catch (err) {
    throw err;
  }
}

async function createExpenseQuery({
  name,
  nominal,
  category
}: Expense): Promise<Expense> {
  try {
    const { data }: { data: Expense } = await axios.post(`${JSON_SERVER_URL}/expenses`, {
      name, 
      nominal,
      category,
      date: new Date().toISOString()
    });

    return data;
  } catch (err) {
    throw err;
  }
}

async function updateExpenseQuery(
  id: string, 
  params: {
    name?: string, 
    nominal?: number, 
    category?: string,
    date?: string 
  }
): Promise<Expense> {
  try {
    if (params.date) params.date = new Date(params.date).toISOString();

    const { data }: { data: Expense } = await axios.patch(`${JSON_SERVER_URL}/expenses/${id}`, {
      ...params
    });

    return data;
  } catch (err) {
    throw err;
  }
}

async function deleteExpenseQuery(id: string): Promise<Expense> {
  try {
    const { data }: { data: Expense } = await axios.delete(`${JSON_SERVER_URL}/expenses/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
}

export { 
  getExpensesQuery, 
  getExpenseQuery, 
  getTotalExpenseQuery,
  createExpenseQuery,
  updateExpenseQuery,
  deleteExpenseQuery
};