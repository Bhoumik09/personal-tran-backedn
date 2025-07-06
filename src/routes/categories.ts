import express from "express"
import { makeTransaction } from "../controllers/transactionController";
import { fetchAllBudgets } from "../controllers/budgetController";
import { fetchAllCategories } from "../controllers/categoriesController";

const categoryRouter = express.Router();
categoryRouter.get('/allCategories',fetchAllCategories);
export default categoryRouter;