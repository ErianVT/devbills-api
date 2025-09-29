import type { TransactionType } from "@prisma/client";

export interface TransactionsFilter {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
  type?: TransactionType;
  categoryId?: string;
}
