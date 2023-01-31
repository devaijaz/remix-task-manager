
import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import type { TaskFormProps } from "~/types/index.server";
import {useCallback, useEffect, useRef} from "react";
const DefaultFormValue = {
  title: "",
  content: "",
};
export const TaskForm = ({ mode }: TaskFormProps) => {
  const loaderData = useLoaderData<{ title: string; content: string }>() || {};
  const formRef = useRef<HTMLFormElement>(null);
  const validationMessages = useActionData<Record<string, string>>();
  const navigate = useNavigate();
  const formValue = { ...DefaultFormValue, ...loaderData };
  const closeHandler = useCallback(() => {
    navigate("..");
  }, []);

  useEffect(()=> {
    if(validationMessages && Object.keys(validationMessages).length) {
      const formElement  = formRef?.current.getElementsByClassName("error-input")[0] as HTMLInputElement;
      formElement.focus();
    }
  }, [validationMessages])

  return (
    <div>
      <Form action="" method="post" style={{ minWidth: "400px" }} ref={formRef}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={`form-input ${validationMessages?.title ? 'error-input outline-red-700 border-red-700': ''}`}
            placeholder="Task Title"
            defaultValue={formValue.title}
          />
          {validationMessages?.title ? <p className="text-error">{validationMessages?.title}</p>: null}
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className={`form-input ${validationMessages?.content ? 'error-input outline-red-700 border-red-700': ''}`}
            placeholder="Task Description"
            defaultValue={formValue.content}
          />
          {validationMessages?.content ? <p className="text-error">{validationMessages?.content}</p>: null}
        </div>
        {/* {validationMessages?.map((message) => {
          return (
            <p className="text-error" key={message}>
              {message}
            </p>
          );
        })} */}
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
