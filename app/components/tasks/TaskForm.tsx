import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import type { TaskFormProps } from "~/types/index.server";

const DefaultFormValue = {
  title: "",
  content: "",
};
export const TaskForm = ({ mode }: TaskFormProps) => {
  const loaderData = useLoaderData<{ title: string; content: string }>() || {};
  const validationMessages = useActionData<string[]>();
  const navigate = useNavigate();
  const formValue = { ...DefaultFormValue, ...loaderData };
  const closeHandler = () => {
    navigate("..");
  };
  return (
    <div>
      <Form action="" method="post" style={{ minWidth: "400px" }}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            placeholder="Task Title"
            defaultValue={formValue.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="form-input"
            placeholder="Task Description"
            defaultValue={formValue.content}
          />
        </div>
        {validationMessages?.map((message) => {
          return (
            <p className="text-error" key={message}>
              {message}
            </p>
          );
        })}
        <div className="actions mt-3 flex justify-between">
          <button className="btn primary">{mode === "edit" ? "Update" : "Create"}</button>
          <button type="button" className="btn danger" onClick={closeHandler}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};
