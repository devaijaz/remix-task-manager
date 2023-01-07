import type { LoaderArgs, ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Modal } from "~/components/Modal";
import { TaskForm } from "~/components/tasks/TaskForm";
import { requireAuthentication } from "~/server/auth.server";
import { deleteTaskById, fetchTaskById, updateTask } from "~/server/tasks.server";
import { validateTask } from "~/server/validation/index.server";
import type { TaskPayload } from "~/types/index.server";

export default function TaskEditPage() {
  return (
    <>
      <Modal title="Edit Task" locked={true}>
        <TaskForm mode="edit" />
      </Modal>
    </>
  );
}

export async function loader({ request, params }: LoaderArgs) {
  try {
    const userInfo = await requireAuthentication(request);
    const taskID = params.id!;
    const task = await fetchTaskById(+taskID, userInfo.userId);
    if (!task) {
      throw json("Task not found with given taskid", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return task;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function action({ request, params }: ActionArgs) {
  try {
    const userInfo = await requireAuthentication(request);
    const taskId = params.id;

    if (!taskId) {
      throw json("Task not found with given taskid", {
        status: 404,
        statusText: "Not Found",
      });
    }
    if (request.method === "DELETE") {
      await deleteTaskById(+taskId, userInfo.userId);
      return redirect("/tasks");
    } else if (request.method === "POST") {
      const task = Object.fromEntries(await request.formData()) as TaskPayload;
      try {
        validateTask(task);
      } catch (e) {
        return e;
      }
      await updateTask(+taskId, userInfo.userId, task);
      return redirect("/tasks");
    }
    return null;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `Edit Task: ${data.title}`,
  };
};
