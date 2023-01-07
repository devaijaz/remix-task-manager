import { Form, useNavigate, useSubmit } from "@remix-run/react";
import type { FormEvent } from "react";
import type { ITask } from "~/types/index.server";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export const TaskListItem = ({ task }: { task: ITask }) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm("Are you sure to delete this task?")) {
      submit(e.currentTarget, {
        method: "delete",
      });
    }
  };

  return (
    <div className="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md transition-all">
      <div className="flex justify-between">
        <h2 className="text-lg">{task.title}</h2>
        <div className="actions flex gap-4 items-center">
          <button
            onClick={(e) => navigate(`${task.id}`)}
            className="btn primary icon"
            title={`Edit the task '${task.title}'`}
          >
            <FaPencilAlt />
          </button>
          <Form method="delete" action={`/tasks/${task.id}`} onSubmit={submitHandler}>
            <button className="btn danger icon" title={`Delete the task '${task.title}'`}>
              <FaTrashAlt />
            </button>
          </Form>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-100">{task.content}</p>
      <p className="text-gray-400 text-xs">{task.created_on}</p>
    </div>
  );
};
