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
    <div className="b">
      <Navigation />
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
