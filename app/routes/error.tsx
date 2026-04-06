import { XCircle } from "lucide-react";
import { isRouteErrorResponse, type MetaFunction, useRouteError } from "react-router";
import Navigation from "~/components/navigation";

export const meta: MetaFunction = () => [
  { title: "Error Demo" },
  { name: "description", content: "Demo error page" },
];

export function loader() {
  throw new Error("This is a demo error to showcase the ErrorBoundary.");
}

export default function RouteComponent() {
  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return (
      <div className="min-h-full">
        <Navigation />
        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="min-h-full">
        <Navigation />
        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error.status === 404) {
    return (
      <div className="min-h-full">
        <Navigation />
        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <Navigation />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
          </div>
        </main>
      </div>
    </div>
  );
}
