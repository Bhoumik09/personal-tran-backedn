import express from "express"
import { deleteTransaction, fetchAllTransactions, makeTransaction } from "../controllers/transactionController";
const transactionRouter = express.Router();
transactionRouter.get('/allTransactions',fetchAllTransactions);
transactionRouter.post('/postTransaction', makeTransaction);
transactionRouter.delete("/:id", deleteTransaction)
export default transactionRouter;