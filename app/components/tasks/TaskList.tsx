import React from "react";
import { useLoaderData } from "@remix-run/react";
import { TaskListItem } from "./TaskListItem";
import type { ITask } from "~/types/index.server";

export const TasksList = () => {
  const loaderData = useLoaderData<ITask[]>() as ITask[];
  if (!loaderData || loaderData.length < 1) {
    return <p className="text-error">No Task Found!</p>;
  }

  return (
    <div className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
      {loaderData.map((task) => (
        <TaskListItem task={task} key={task.id}></TaskListItem>
      ))}
    </div>
  );
};
