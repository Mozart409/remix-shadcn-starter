import type { MetaFunction } from "@remix-run/node";
import Navigation from "~/components/navigation";
import { Button } from "~/components/ui/button";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-full">
      <Navigation />
      <div className="py-10">
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="">
            <h1 className="text-4xl font-bold">Hello World</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Button>Main Button</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
