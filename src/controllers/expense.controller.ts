import type { Request, Response, NextFunction } from "express";
import type { Expense } from "../interfaces/expense.interface";
import { 
  getExpensesAction, 
  getExpenseAction, 
  getTotalExpenseAction,
  createExpenseAction, 
  updateExpenseAction, 
  deleteExpenseAction 
} from "../actions/expense.action";

async function getExpensesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: Expense[] = await getExpensesAction();

    res.status(200).json({
      message: "Get expenses success",
      data
    });
  } catch (err) {
    next(err);
  }
}

async function getExpenseController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const data: Expense = await getExpenseAction(id);

    res.status(200).json({
      message: "Get expense success",
      data
    });
  } catch (err) {
    next(err);
  }
}

async function getTotalExpenseController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filters = req.query;
    const data: { total: number } = await getTotalExpenseAction(filters);

    res.status(200).json({
      message: "Get total expense success",
      data
    });
  } catch (err) {
    next(err);
  }
}

async function createExpenseController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, nominal, category } = req.body;

    const data: Expense = await createExpenseAction({
      name,
      nominal: Number(nominal),
      category
    });

    res.status(200).json({
      message: "Create expense success",
      data
    });
  } catch (err) {
    next(err);
  }
}

async function updateExpenseController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: Expense = await updateExpenseAction(req.params.id, req.body);

    res.status(200).json({
      message: "Update expense success",
      data
    });
  } catch (err) {
    next(err);
  }
}

async function deleteExpenseController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data: Expense = await deleteExpenseAction(req.params.id);

    res.status(200).json({
      message: "Delete expense success",
      data
    });
  } catch (err) {
    next(err);
  }
}

export { 
  getExpensesController,
  getExpenseController, 
  getTotalExpenseController,
  createExpenseController,
  updateExpenseController,
  deleteExpenseController
};