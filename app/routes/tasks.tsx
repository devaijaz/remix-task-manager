import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { TaskHeader } from "~/components/tasks/TaskHeader";
import { TasksList } from "~/components/tasks/TaskList";
import { requireAuthentication } from "~/server/auth.server";
import { fetchTasks } from "~/server/tasks.server";

export default function TasksPage() {
  return (
    <>
      <TaskHeader></TaskHeader>
      <div className="rounded-md">
        <TasksList />
      </div>
      <Outlet />
    </>
  );
}

export async function loader({ request, params }: LoaderArgs) {
  try {
    const userInfo = await requireAuthentication(request);
    const tasks = await fetchTasks({ page: 1, userId: userInfo.userId });
    return tasks;
  } catch (e) {
    return e;
  }
}

export const meta: MetaFunction = () => {
  return {
    title: "Manage Tasks",
  };
};
