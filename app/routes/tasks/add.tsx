import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { Modal } from "~/components/Modal";
import { TaskForm } from "~/components/tasks/TaskForm";
import { requireAuthentication } from "~/server/auth.server";
import { createTask } from "~/server/tasks.server";
import type { TaskPayload } from "~/types/index.server";
import { validateTask } from "~/server/validation/index.server";

export default function TaskAddPage() {
  return (
    <>
      <Modal title="Create Tasks">
        <TaskForm mode="create" />
      </Modal>
    </>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const userId = await requireAuthentication(request);
  const task = Object.fromEntries(formData) as TaskPayload;
  try {
    validateTask(task);
  } catch (e) {
    return e;
  }
  await createTask(task, userId);
  return redirect("/tasks");
}

export const meta: MetaFunction = () => {
  return {
    title: "Add a new Task",
  };
};
