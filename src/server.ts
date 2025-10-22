import app from "./app";
import { env } from "./config/env";
import { initializeFirebaseAdmin } from "./config/firebase";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

const PORT = env.PORT;

try {
  // Se o Firebase falhar, vai lançar erro e não inicia o servidor
  initializeFirebaseAdmin();
} catch (err) {
  console.error("Falha ao inicializar Firebase:", err);
  process.exit(1); // encerra o processo
}

const startServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port: PORT }).then(() => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
