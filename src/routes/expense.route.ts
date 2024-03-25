import express from "express";
import { 
  getExpensesController, 
  getExpenseController, 
  getTotalExpenseController,
  createExpenseController, 
  updateExpenseController, 
  deleteExpenseController 
} from "../controllers/expense.controller";

const router = express.Router();

router.route("/")
  .get(getExpensesController)
  .post(createExpenseController);

router.get("/total", getTotalExpenseController);

router.route("/:id")
  .get(getExpenseController)
  .patch(updateExpenseController)
  .delete(deleteExpenseController);


export default router;
