import { env } from "node:process";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import routes from "./routes";
import cors from "@fastify/cors";

const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === "dev" ? "info" : "error",
  },
});

app.register(cors);

app.register(routes, { prefix: "/api" });

export default app;
