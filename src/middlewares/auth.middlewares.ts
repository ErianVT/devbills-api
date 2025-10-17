import type { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  // const authHeader = request.headers.authorization;
  const authHeader =
    "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1YTAwNWU5N2NiMWU0MjczMDBlNTJjZGQ1MGYwYjM2Y2Q4MDYyOWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRXJpYW4gVG9tw6kiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSVJIclNGQWdsMHZYOXVkcXFmU2llQnUxVUUyX205R3hSaDhXeGVmTHdBSkNxTE91b1NaUT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9kZXZiaWxscy1hODExYyIsImF1ZCI6ImRldmJpbGxzLWE4MTFjIiwiYXV0aF90aW1lIjoxNzYwNjA2NjkxLCJ1c2VyX2lkIjoid0xPR0I0Q0N6dWc5NzdPOFRvdEJxSjFIRUZCMyIsInN1YiI6IndMT0dCNENDenVnOTc3TzhUb3RCcUoxSEVGQjMiLCJpYXQiOjE3NjA2OTM1ODMsImV4cCI6MTc2MDY5NzE4MywiZW1haWwiOiJlcmlhbnZpZWlyYS50b21lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE4Mzk0ODc2NzA3OTgyNDM4MDYwIl0sImVtYWlsIjpbImVyaWFudmllaXJhLnRvbWVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.npsRNODw7arLfJNFCoccVEdDRzJlba9tcCymYb_rRcGHpnkVcdY_AqRuKLuAsLcQ1IoqKL1xCzpIml2cNZYn9866MUl0HDcx0URoVg53ABRuO14xLWYOPdL1Mb_5S4-WpJGfIJeMJU0l5SoqOgL1duRlyvW6qaZ3U3GyX7l2K9rbKChI057zGniuFrwwvjgWsYn83yigk1lfKSoYAbpIm-iYzbBXUenLBdJHCjf8UQc3jh_SbseRDeSmKJ_pd7fzMkW50MMqWkfisfzDyOn08teuONXUTZnQ7cIFC2meWFktigDfm8pXzdzrWyH2h0W6dMf4x6JiFBICph4HTuj0ew";

  // File "middlewares/auth.middlewares.ts" not spell checked:
  // For performance reasons, the spell checker does not check documents with very long blocks of text without spaces or word breaks. The limit is currently 1000.

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.code(401).send({ error: "Token de autorização não fornecido" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    request.userId = decodedToken.uid;
  } catch (_err) {
    request.log.error("Erro na verificação do token de autenticação");
    reply.code(401).send({ error: "Token invalido ou expirado" });
  }
};
