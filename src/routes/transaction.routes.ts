import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransactions.controller";
import { getHistoricalTransactions } from "../controllers/transactions/getHistoricalTransactions.controller";
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
      // body: zodToJsonSchema(createTransactionSchema),
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

  //Histórico de Transações
  fastify.route({
    method: "GET",
    url: "/historical",
    schema: {
      //querystring: zodToJsonSchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTransactions,
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
