import type { FastifyInstance } from "fastify";
import Fastify from "fastify";

import routes = require("./routes");

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(routes, { prefix: "/api" });

export default app;
