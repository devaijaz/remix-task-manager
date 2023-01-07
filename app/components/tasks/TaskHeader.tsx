import { Link, useNavigate } from "@remix-run/react";

export const TaskHeader = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-end gap-3 items-center mb-3">
      <button className="btn primary" onClick={() => navigate("add")}>
        Add Task
      </button>
      <Link to="/tasks/download" target={"_blank"}>
        Download Tasks
      </Link>
    </nav>
  );
};
