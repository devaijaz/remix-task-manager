import type { HeadersFunction } from "@remix-run/node";

export default function Index() {
  return (
    <div>
      <h1 className="text-center text-2xl text-green-600">React - Fullstack Application</h1>
      <ul>
        <li>Route Pages</li>
        <li>Loader function: Load data required for route and nested components</li>
        <li>Accessing data from parent loader: useMatches hook</li>
        <li>Action function: Handle form submission and request with http method PUT/DELETE</li>
        <li>Handling server side validation</li>
        <li>Handling errors using CatchBoundary and ErrorBoundary</li>
        <li>Authentication</li>
        <li>Route Protection</li>
        <li>Html Page Metadata</li>
        <li>Setting Http Custom Headers</li>
        <li>Hooks: useLoaderData(), useActionData(), useNavigate(), useMatches()</li>
        <li>Disabling JAVASCRIPT on some pages, if page content is static</li>
      </ul>
    </div>
  );
}

export const handle = {
  noJs: true,
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=3600",
  };
};
