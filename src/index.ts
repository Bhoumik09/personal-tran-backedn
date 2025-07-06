import express from 'express';
import transactionRouter from './routes/transactions';
import budgetRouter from './routes/budgets';
import categoryRouter from './routes/categories';
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/transaction",transactionRouter);
app.use('/budget',budgetRouter );
app.use('/category', categoryRouter);
app.listen(5000, ()=>{
    console.log("Connected to server working at port 5000")
})