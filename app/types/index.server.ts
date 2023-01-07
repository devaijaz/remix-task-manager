export type ITask = {
  id: number;
  title: string;
  content: string;
  created_on: string;
};
export type TaskPayload = Pick<ITask, "content" | "title">;

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  fullname: string;
};

export type TaskFetchParams = {
  page: number;
  userId: number;
};

export type TaskFormProps = {
  mode: "create" | "edit";
};
