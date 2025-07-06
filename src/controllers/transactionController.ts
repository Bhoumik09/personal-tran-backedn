import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Transaction } from "@prisma/client";
export const fetchAllTransactions = async (_: Request, res: Response) => {
  try {
    const transactionData: Omit<Transaction, "createdAt">[] =
      await prisma.transaction.findMany({
        include:{
          category:{
            select:{
              name:true,
              id:true
            }
          }
        },
        omit: {
          createdAt: true,
        },
      });
    res
      .status(200)
      .json({ msg: "Transaction fetched successfully", transactionData });
  } catch (error) {
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};

export const makeTransaction = async (req: Request, res: Response) => {
  try {

    const {
      description,
      amount,
      type,
      date,
      category,
    }: {
      description: string;
      amount: number;
      type: "income" | "expense";
      date: string;
      category: { id: string; name: string };
    } = req.body;
    console.log(req.body)
    const transactionDetail = await prisma.transaction.create({
      data: {
        description,
        amount,
        type,
        date,
        categoryId: category.id,
      },
      include:{
        category:{
          select:{
            id:true,
            name:true
          }
        }
      },
      omit:{
        categoryId:true,
        createdAt:true
      }
    });
    res.status(200).json({ msg: "Transaction created successfully" , transactionDetail});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};
