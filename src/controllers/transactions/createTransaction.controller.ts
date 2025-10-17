import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import {
  type CreateTransactionsInput,
  createTransactionSchema,
} from "../../schemas/transaction.schema";

const createTransaction = async (
  request: FastifyRequest<{ Body: CreateTransactionsInput }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    reply.status(401).send({ error: "Usuario não autenticado" });
    return;
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage = result.error.message || "Erro de validação";

    reply.status(400).send({ error: errorMessage });
    return;
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });
    if (!category) {
      reply.status(400).send({ error: "Categoria inválida" });
      return;
    }

    const parseDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parseDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send({ newTransaction });
  } catch (_err) {
    request.log.error("Erro ao criar transação");
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
};

export default createTransaction;
