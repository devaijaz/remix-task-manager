import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
  useTransition,
} from "@remix-run/react";
import React, { useEffect } from "react";
import { Error } from "./components/Error";
import { GlobalHeader } from "./components/GlobalHeader";
import { getUserInfoFromSession } from "./server/auth.server";

import tailwind from "./styles/app.css";

export const meta: MetaFunction = ({ data }) => {
  return {
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
  };
};

const Document = ({ children }: { children: React.ReactNode }) => {
  const transition = useTransition();
  const matches = useMatches();
  const noJs = matches?.some((match) => match.handle?.noJs);
  const loading = transition.state !== "idle";
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="h-[55px]">
          <GlobalHeader />
        </header>
        <main className="container m-auto p-2 h-[calc(100vh-55px)]">{children}</main>
        <ScrollRestoration />
        {!noJs && <Scripts />}
        <LiveReload />
        {loading ? <div className="loader-overlay"></div> : null}
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: tailwind }];
}

export function ErrorBoundary() {
  useEffect(() => {
    document.title = "Error Page";
  }, []);
  return (
    <Document>
      <Error />
    </Document>
  );
}
export function CatchBoundary() {
  const caughtData = useCatch();
  useEffect(() => {
    document.title = caughtData.statusText || "Error";
  }, [caughtData]);
  return (
    <Document>
      <Error title={caughtData.statusText} errorMessage={caughtData.data} />
    </Document>
  );
}

export async function loader({ request }: { request: Request }) {
  const userInfo = await getUserInfoFromSession(request);
  return userInfo;
}
