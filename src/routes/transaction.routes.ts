import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";

import { createTransactionSchema } from "../schemas/transaction.schema";

const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),

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
};

export default transactionRoutes;
