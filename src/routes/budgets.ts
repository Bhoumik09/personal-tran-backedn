import express from "express"
import { fetchAllBudgets, makeBudget } from "../controllers/budgetController";

const budgetRouter = express.Router();
budgetRouter.get('/allBudgets',fetchAllBudgets);
budgetRouter.post('/postBudgets', makeBudget);


export default budgetRouter;