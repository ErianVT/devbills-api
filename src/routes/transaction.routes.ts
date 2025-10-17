import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransactions.controller";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

//import { createTransactionSchema, getTransactionsSchema } from "../schemas/transaction.schema
const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authMiddleware);

  //Criação
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      //body: zodToJsonSchema(createTransactionSchema),
      // body: {
      //   type: "object",
      //   required: ["description", "amount", "date", "categoryId", "type"],
      //   properties: {
      //     description: { type: "string" },
      //     amount: { type: "number" },
      //     date: { type: "string", format: "date-time" },
      //     categoryId: { type: "string" },
      //     type: { type: "string", enum: ["expense", "income"] },
      //   },
      // },
    },
    handler: createTransaction,
  });

  //Buscar com filtros
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      // querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });

  //Buscar o resumo
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      //querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  //Deletar transação

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      // params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
};

export default transactionRoutes;
