import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
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
    const budgetData: Omit<BudgetList, "createdAt" | "categoryId"> =
      await prisma.budget.create({
        data: {
          categoryId: category.id,
          month,
          amount,
        },
        include: {
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
        omit: {
          createdAt: true,
          categoryId: true,
        },
      });
    res
      .status(200)
      .json({ msg: "Budget created successfully", budgetDetail: budgetData });
  } catch (error) {
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};
export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const {
      amount,
      category,
      month,
    }: {
      amount: number;
      category: { name: string; id: string };
      month: string;
    } = req.body;
    const budgetData: Omit<BudgetList, "createdAt" | "categoryId"> =
      await prisma.budget.update({
        where:{
          id
        },
        data: {
          categoryId: category.id,
          month,
          amount,
        },
        include: {
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
        omit: {
          createdAt: true,
          categoryId: true,
        },
      });
    res
      .status(200)
      .json({ msg: "Budget created successfully", budgetDetail: budgetData });
  } catch (error) {
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    await prisma.budget.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ msg: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error occured in deleting " });
  }
};
