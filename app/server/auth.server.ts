import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { hash, compare } from "bcryptjs";
import { prisma } from "./prisma.server";
import type { LoginPayload, SignupPayload } from "~/types/index.server";
const INVALID_CREDENTIAL_ERROR = "Invalid email or password";
const USER_EXISTS_ERROR = "Email already in use, try another";
const GENERIC_ERROR_MESSAGE = "An error occured, please try later!";

const session = createCookieSessionStorage({
  cookie: {
    isSigned: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24*60*60,
    secrets: ["superSecret"],
  },
});

async function createUserSession(userId: number, fullname: string) {
  const userSession = await session.getSession();
  userSession.set("user_id", userId);
  userSession.set("fullname", fullname);
  return redirect("/", {
    headers: {
      "Set-Cookie": await session.commitSession(userSession),
    },
  });
}

export async function destroyUserSession() {
  const userSession = await session.getSession();
  return redirect("/", {
    headers: {
      "Set-Cookie": await session.destroySession(userSession),
    },
  });
}

export async function getUserInfoFromSession(request: Request) {
  const cookies = request.headers.get("Cookie");
  const userSession = await session.getSession(cookies);
  return {
    userId: userSession.get("user_id") || null,
    fullname: userSession.get("fullname") || null,
  };
}

export async function redirectIfLoggedIn(request: Request, path: string = "/") {
  const userInfo = await getUserInfoFromSession(request);
  if (userInfo?.userId) {
    return redirect(path);
  }
  return null;
}
export async function requireAuthentication(request: Request) {
  const userInfo = await getUserInfoFromSession(request);
  if (!userInfo.userId) {
    throw redirect("/auth");
  }
  return userInfo;
}

export async function loginUser({ email, password }: LoginPayload) {
  try {
    const existingUser = await prisma.user.findFirst({ where: { email, enabled: true } });
    if (!existingUser) {
      const error = new Error(INVALID_CREDENTIAL_ERROR);
      error.name = INVALID_CREDENTIAL_ERROR;
      throw error;
    }
    const passwordMatched = await compare(password, existingUser.password);
    if (!passwordMatched) {
      const error = new Error(INVALID_CREDENTIAL_ERROR);
      error.name = INVALID_CREDENTIAL_ERROR;
      throw error;
    }
    return createUserSession(existingUser.id, existingUser.fullname);
  } catch (error: any) {
    if (error.name === INVALID_CREDENTIAL_ERROR) {
      return {
        validationError: error.message,
      };
    } else {
      console.error(error)
      return {
        error: GENERIC_ERROR_MESSAGE,
      };
    }
  }
}

export async function signupUser({ email, password, fullname }: SignupPayload) {
  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      const error = new Error(USER_EXISTS_ERROR);
      error.name = USER_EXISTS_ERROR;
      throw error;
    }
  } catch (error: any) {
    if (error.name === USER_EXISTS_ERROR) {
      return {
        validationError: error.message,
      };
    } else {
      console.error(error);
      return {
        error: GENERIC_ERROR_MESSAGE,
      };
    }
  }
  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(password, 12),
      fullname,
    },
  });
  return createUserSession(user.id, fullname);
}
