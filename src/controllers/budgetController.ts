import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Budget, Prisma, Transaction } from "@prisma/client";
export type BudgetList = Prisma.BudgetGetPayload<{
  include: {
    category: {
      select: {
        name: true;
        id: true;
      };
    };
  };
}>;
export const fetchAllBudgets = async (_: Request, res: Response) => {
  try {
    const BudgetData: BudgetList[] | null = await prisma.budget.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json({ msg: "Budget fetched successfully", BudgetData });
  } catch (error) {
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};

export const makeBudget = async (req: Request, res: Response) => {
  try {
    const {
      amount,
      category,
      month,
    }: {
      amount: number;
      category: { name: string; id: string };
      month: string;
    } = req.body;
    const budgetData: Omit<BudgetList,"createdAt"> = await prisma.budget.create({
      data: {
        categoryId: category.id,
        month,
        amount,
      },
      include:{
        category:{
          select:{
            name:true,
            id:true
          }
        }
      },
      omit:{
        createdAt:true
      }
      
    });
    res
      .status(200)
      .json({ msg: "Budget created successfully", budgetData });
  } catch (error) {
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};
