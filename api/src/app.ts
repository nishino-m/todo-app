import { Elysia } from "elysia";
import { taskRoutes } from "./routes/taskRoutes";

export const createApp = (): Elysia => {
    const app: Elysia = new Elysia();
    
    app.get("/health", (): { ok: boolean } => ({ ok: true }));
  
    taskRoutes(app);
  
    return app;
  };
  