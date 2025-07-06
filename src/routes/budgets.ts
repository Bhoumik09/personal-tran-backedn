import express from "express"
import { deleteBudget, fetchAllBudgets, makeBudget } from "../controllers/budgetController";

const budgetRouter = express.Router();
budgetRouter.get('/allBudgets',fetchAllBudgets);
budgetRouter.post('/postBudgets', makeBudget);
budgetRouter.put('/:id', makeBudget);
budgetRouter.delete('/:id', deleteBudget);


export default budgetRouter;