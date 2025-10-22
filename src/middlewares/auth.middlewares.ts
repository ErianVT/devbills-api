import type { FastifyReply, FastifyRequest } from "fastify";
import { admin } from "../config/firebase";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const authHeader = request.headers.authorization;

  // File "middlewares/auth.middlewares.ts" not spell checked:
  // For performance reasons, the spell checker does not check documents with very long blocks of text without spaces or word breaks. The limit is currently 1000.
  console.log("→ Entrou no middleware");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.code(401).send({ error: "Token de autorização não fornecido" });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("→ Token recebido:", `${token.substring(0, 20)}...`); // Log resumido

  try {
    console.log("→ Verificando token...");
    console.log("→ Project ID:", process.env.FIREBASE_PROJECT_ID); // Verifica se está certo
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("→ Token válido! User ID:", decodedToken.uid);
    request.userId = decodedToken.uid;
  } catch (err) {
    request.log.error("Erro na verificação do token:", err);
    return reply.code(401).send({ error: "Token inválido ou expirado" }); // ✅ Adiciona return
  }
  console.log("→ Middleware finalizado com sucesso");
};
