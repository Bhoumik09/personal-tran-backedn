import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Category } from "@prisma/client";

export const fetchAllCategories = async (_: Request, res: Response) => {
  try {
    const categoryData: Category[] | null = await prisma.category.findMany({});
    res.status(200).json({ msg: "Categries fetched successfully", categoryData });
  } catch (error) {
    res.status(500).json({ error: "Error occured while fethcing transaction" });
  }
};

