import dayjs from "dayjs";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetHistoricalTransactionsQuery } from "../../schemas/transaction.schema";

export const getHistoricalTransactions = async (
  request: FastifyRequest<{ Querystring: GetHistoricalTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  if (!userId) {
    reply.status(401).send({ error: "Usuario não autenticado" });
    return;
  }

  const { month, year, months = 6 } = request.query;

  const baseDate = new Date(year, month - 1, 1);

  const startDate = dayjs(baseDate)
    .subtract(months - 1, "month")
    .startOf("month")
    .toDate();
  const endDate = dayjs(baseDate).endOf("month").toDate();
  //Parei no minuto 17:52
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        date: true,
      },
    });

    console.log(transactions);
  } catch (_err) {}
};
