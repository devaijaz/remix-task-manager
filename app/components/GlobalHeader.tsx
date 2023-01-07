import { Link, useLoaderData } from "@remix-run/react";
import React from "react";

export const GlobalHeader = () => {
  const loaderData = useLoaderData();
  return (
    <div className="card shadow-sm p-2 h-full">
      <nav className="flex justify-between items-center h-full">
        <Link to="/">
          <img src="/images/logo.png" alt="Company name" width={"55px"} />
        </Link>
        <ul className="flex gap-2 items-center">
          <li>
            <Link to="/tasks">Manage Tasks</Link>
            <span>&nbsp;|&nbsp;</span>
          </li>
          <li>
            {loaderData && loaderData.userId ? (
              <div className="flex items-center gap-3">
                <span>
                  {`Welcome!`}&nbsp;
                  <span className="font-bold">{`${loaderData.fullname}`}</span>
                </span>

                <form method="post" action="/logout">
                  <button className="btn outline">Logout</button>
                </form>
              </div>
            ) : (
              <Link to="/auth">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
