import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import type { TaskFetchParams, TaskPayload } from "~/types/index.server";
export const FETCH_SIZE = 10;

export async function fetchTasks({ page, userId }: TaskFetchParams) {
  return prisma.task.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      created_on: true,
    },
    orderBy: {
      created_on: "desc",
    },
    where: { userId },
    take: FETCH_SIZE,
    skip: (page - 1) * FETCH_SIZE,
  });
}

export async function fetchTaskById(taskId: number, userId: number) {
  return prisma.task.findFirst({
    where: { id: taskId, userId },
    select: {
      id: true,
      title: true,
      content: true,
      created_on: true,
    },
  });
}
export async function deleteTaskById(taskId: number, userId: number) {
  const task = await fetchTaskById(taskId, userId);
  if (task) {
    await prisma.task.delete({
      where: { id: taskId },
    });
  } else {
    throw json("Either task does not exists or you do not have permission!", {
      status: 403,
      statusText: "Error",
    });
  }
}

export async function updateTask(taskId: number, userId: number, updatedTask: TaskPayload) {
  const task = await fetchTaskById(taskId, userId);
  if (task) {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        content: updatedTask.content,
        title: updatedTask.title,
      },
    });
  } else {
    throw json("Either task does not exists or you do not have permission!", {
      status: 403,
      statusText: "Error",
    });
  }
}

export async function createTask(task: TaskPayload, userId: number) {
  await prisma.task.create({
    data: {
      title: task.title,
      content: task.content,
      userId,
    },
  });
}
