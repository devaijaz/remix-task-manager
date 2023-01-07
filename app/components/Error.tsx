import { Link } from "@remix-run/react";
import type { FC } from "react";
const defaultTitle = "Error";
const defaultErrorMessage = "An error occured, try again later!";

export type ErrorProps = {
  title?: string;
  errorMessage?: string;
};

export const Error: FC<ErrorProps> = ({ title, errorMessage }) => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-96 m-auto bg-red-400 rounded text-white p-3 dark:bg-[#222]">
        <h2 className="text-2xl text-center border-b">{title ?? defaultTitle}</h2>
        <p className="mt-2">{errorMessage ?? defaultErrorMessage}</p>
        <Link to="/">Back to safety</Link>
      </div>
    </div>
  );
};
