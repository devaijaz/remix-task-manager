import { requireAuthentication } from "~/server/auth.server";
import { fetchTasks } from "~/server/tasks.server";

export async function loader({ request }: { request: Request }) {
  try {
    const userId = await requireAuthentication(request);
    const tasks = await fetchTasks({ page: 1, userId });
    return tasks;
  } catch (e) {
    console.log(e);
    return e;
  }
}
