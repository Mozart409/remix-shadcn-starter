import { XCircle } from "lucide-react";
import type { LoaderFunctionArgs } from "react-router";
import { isRouteErrorResponse, type MetaFunction, useLoaderData, useRouteError } from "react-router";
import Navigation from "~/components/navigation";

export const meta: MetaFunction = () => [
  // your meta here
  { title: "About Us" },
  { name: "description", content: "Welcome to our About Us Page!" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const agent = request.headers.get("User-Agent");
  return { agent };
};

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="min-h-full">
      <Navigation />
      <div className="py-10">
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            <h1 className="text-4xl font-bold">About Us</h1>
            <h2 className="text-3xl font-semibold">Your user agent</h2>
            <p className="text-lg">{data.agent}</p>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
        </main>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">An unexpected error occurred:</h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="pl-5 space-y-1 list-disc">
                <li>{error.message}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">An unexpected error occurred:</h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="pl-5 space-y-1 list-disc">
                <li>Unknown Error</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error.status === 404) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">An unexpected error occurred:</h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="pl-5 space-y-1 list-disc">
                <li>Page not found</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">An unexpected error occurred:</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="pl-5 space-y-1 list-disc">
              <li>{error.statusText}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
