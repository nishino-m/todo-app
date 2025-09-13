import {  Elysia } from "elysia";
import {
    getTask,
    createTask,
    completeTask,
} from '../controllers/taskController'

export const taskRoutes = (app: Elysia) =>
    app.group('/api/tasks', (grouped) =>
        grouped
.get('/', getTask())
.post("/", ({ body, set }) => createTask({ body, set }))
.post("/:id/complete", ({ params, set }) => completeTask({ params, set }))
);