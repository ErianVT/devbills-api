import { env } from "node:process";
import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import routes from "./routes";

const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === "dev" ? "info" : "error",
  },
});

app.register(cors);

app.register(routes, { prefix: "/api" });

export default app;
