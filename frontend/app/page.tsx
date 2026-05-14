import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/create-workflow">
      <Button>create-workflow</Button>
      <button className="text-primary">create workflow</button>
    </Link>
  );
}
