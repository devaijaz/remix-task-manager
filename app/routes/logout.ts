import { destroyUserSession } from "~/server/auth.server";

export function action({ request }: { request: Request }) {
  return destroyUserSession();
}
