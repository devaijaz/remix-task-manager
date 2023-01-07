import React, { useEffect, useId, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "@remix-run/react";
export type ModalProps = {
  title: string;
  children: React.ReactNode;
  locked?: boolean;
};
export const Modal = (
  { children, title, locked }: ModalProps = { children: null, title: null, locked: true }
) => {
  const navigate = useNavigate();
  const id = useId();
  const handleClose = () => {
    !locked && navigate("..");
  };
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    let root = document.getElementById(`${id}`);
    if (!root) {
      root = document.createElement("div");
      root.id = id;
      document.body.appendChild(root);
      root.classList.add("modal-overlay");
    }
    setInitialized(true);
    return () => {
      document.body.removeChild(root!);
    };
  }, [id]);
  return (
    <>
      {initialized
        ? (ReactDOM.createPortal(
            <>
              <div className="w-full h-full bg-black opacity-70 absolute"></div>
              <div
                className="w-full h-full flex justify-center items-center absolute"
                onClick={handleClose}
              >
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header text-center px-1 py-2 bg-gray-200 dark:bg-black rounded-md">
                    <h1>{title}</h1>
                  </div>
                  <div className="modal-body p-4">{children}</div>
                </div>
              </div>
            </>,
            window.document.getElementById(id)!
          ) as unknown as HTMLDivElement)
        : null}
    </>
  );
};
