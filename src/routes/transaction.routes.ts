import type { FastifyInstance } from "fastify";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { getTransactionsSummarySchema } from "../schemas/transaction.schema";

//import { createTransactionSchema, getTransactionsSchema } from "../schemas/transaction.schema
const transactionRoutes = async (fastify: FastifyInstance) => {
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
};

export default transactionRoutes;
