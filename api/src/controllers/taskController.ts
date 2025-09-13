import { prisma } from "../prisma";
import { z } from "zod";
import type { ZodIssue } from "zod";
import { Prisma } from '@prisma/client';
import type { Task } from "@prisma/client";

import type { Context } from "elysia";


const CreateTaskSchema = z.object({
    title: z.string().min(1).max(255),
});
type CreateTaskBody = z.infer<typeof CreateTaskSchema>;

const IdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});
type IdParam = z.infer<typeof IdParamSchema>;

export const getTask = async (): Promise<{ data:Task[] }> => {
    const tasks: Task[] =await prisma.task.findMany({
        where: { done: false },
        orderBy: { createdAt: 'desc' },
    });
    return { data: tasks };
};

export const createTask = async ( { body, set}: { body:unknown; set: Context['set'] } ): Promise< { data: Task } | { error: { message:string; issues?: ZodIssue[] } }> => {
    const parsed = CreateTaskSchema.safeParse(body);
    if (!parsed.success) {
        set.status = 400; 
        return { 
            error: {
                message: 'Invalid body', 
                issues: parsed.error.issues,
            }, 
        };
    }
    
    const data: CreateTaskBody = parsed.data;
    const task: Task = await prisma.task.create({ data });
    set.status = 200;
    return { data:task };
};

export const completeTask = async ( { params, set }: { params: unknown; set: Context['set'] } ): Promise< { data: Task } | { error: { message:string; issues?: ZodIssue[] } }> => {
    const parsed = IdParamSchema.safeParse(params);
    if ( !parsed.success) {
        set.status = 400;
        return {
            error: {
                message: 'Invalid param',
                issues: parsed.error?.issues,
            },
        };
    }
    const { id }: IdParam = parsed.data;
    const found: Task | null = await prisma.task.findUnique({ where: { id } });
    if (!found) {
        set.status = 404;
        return {
            error: {
                message: 'Not found',
            },
        };
    }

    if (found.done) return { data:found };

    const updated: Task = await prisma.task.update({
        where: { id },
        data: { done: true },
    });

    return { data:updated };
};
