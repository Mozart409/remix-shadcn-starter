import type { MetaFunction } from "@remix-run/node";
import Navigation from "~/components/navigation";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { toast } = useToast();
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
            <Button
              onClick={() => {
                toast({
                  title: "Hello World",
                  description: "This is a test",
                });
              }}
            >
              Show Toast
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
