import { Button } from "@/components/ui/button";
import Link from "next/link";
import CircularGallery from "@/components/ui/CircularGallery";
import AiAssistantsList from "@/services/AiAssistantsList";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center mt-12">
        <Link href="/ai-assistants">
          <Button>Press Me</Button>
        </Link>
      </div>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} items={AiAssistantsList} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-9xl text-center">Welcome To AI Assistants</h1>
      </div>
    </div>
  );
}
