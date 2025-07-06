import express from "express"
import { fetchAllTransactions, makeTransaction } from "../controllers/transactionController";
const transactionRouter = express.Router();
transactionRouter.get('/allTransactions',fetchAllTransactions);
transactionRouter.post('/postTransaction', makeTransaction);
export default transactionRouter;