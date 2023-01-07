import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { loginUser, redirectIfLoggedIn, signupUser } from "~/server/auth.server";
import type { LoginPayload, SignupPayload } from "~/types/index.server";
import { validateAuthForm } from "~/server/validation/index.server";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<Record<string, string>>();
  const mode = searchParams.get("mode") || "login";
  const isLoginMode = mode === "login";

  return (
    <div className="flex flex-col justify-center align-middle h-full">
      <Form className="card align-middle w-96 m-auto p-4 flex flex-col gap-6" method="post">
        <div className="form-group flex flex-col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-input"
            autoComplete="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group flex flex-col">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="form-input"
            autoComplete="off"
            placeholder="Enter your password"
          />
        </div>
        {mode !== "login" && (
          <div className="form-group flex flex-col">
            <label htmlFor="fullname" className="form-label">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              required
              name="fullname"
              className="form-input"
              autoComplete="off"
              placeholder="Enter your fullname"
            />
          </div>
        )}

        {actionData && Object.values(actionData).length > 0
          ? Object.values(actionData).map((message, index) => {
              return (
                <p className="text-error" key={index}>
                  {message}
                </p>
              );
            })
          : null}

        <div>
          <button className="btn primary">{isLoginMode ? "Login" : "Signup"}</button>
          <p className="mt-2 flex gap-3">
            <span>{isLoginMode ? "Not registered?" : "I am already registered"}</span>
            {isLoginMode ? (
              <Link to="?mode=signup">Signup</Link>
            ) : (
              <Link to="?mode=login">Signin</Link>
            )}
          </p>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request, params }: ActionArgs) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") || "login";
  const isLoginMode = mode === "login";
  const formData = await request.formData();
  const credential = Object.fromEntries(formData);
  try {
    validateAuthForm({ ...credential, mode: isLoginMode ? "login" : "signup" });
  } catch (e) {
    return e;
  }
  if (isLoginMode) {
    return loginUser(credential as LoginPayload);
  } else {
    return signupUser(credential as SignupPayload);
  }
}

export async function loader({ request }: LoaderArgs) {
  return redirectIfLoggedIn(request, "/");
}
