import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/ai-assistants">
        <Button>Press Me</Button>
      </Link>
    </div>
  );
}
