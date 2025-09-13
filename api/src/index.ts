import { createApp } from "./app";
import { prisma } from "./prisma";
import type { Elysia as ElysiaApp } from "elysia";

const PORT: number = Number(3005);

const app: ElysiaApp = createApp();
const server = app.listen({ port: Number(process.env.PORT ?? 3005), hostname: "0.0.0.0" });

console.log(`API ready on http://localhost:${PORT}`);

const shutdown = async (signal: string): Promise<never> => {
  console.log(`\n${signal} received. Shutting down...`);
  try {
    await prisma.$disconnect();
  } finally {
    server.stop?.();
    process.exit(0);
  }
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
