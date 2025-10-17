import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema";
import type { TransactionsFilter } from "../../types/transactions.types";

dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  if (!userId) {
    reply.status(401).send({ error: "Usuario não autenticado" });
    return;
  }

  const { month, year, type, categoryId } = request.query;

  const filters: TransactionsFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }
  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: { color: true, name: true, type: true },
        },
      },
    });

    reply.send(transactions);
  } catch (_err) {
    request.log.error("Erro ao buscar transações");
    reply.status(500).send({ error: "Erro do servidor" });
  }
};
