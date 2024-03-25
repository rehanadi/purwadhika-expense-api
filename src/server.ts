import express, { type Application, Request, Response, NextFunction } from 'express';
import { PORT as API_PORT } from "./config";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import expenseRouter from './routes/expense.route'

const PORT: number = Number(API_PORT) || 8080;

const app: Application = express();

app.use(express.json());

app.use("/expenses", expenseRouter);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});