import { Button } from "@/components/ui/button";
import Link from "next/link";
import CircularGallery from "@/components/ui/CircularGallery";
import AiAssistantsList from "@/services/AiAssistantsList";
import { MorphingText } from "@/components/magicui/morphing-text";
import Image from "next/image";
import { ModeToggle } from "./(main)/_components/ModeToggle";

export default function Home() {
  const texts = [
    "Hello",
    "Welcome",
    "TO",
    "Your",
    "Personalised",
    "Ai",
    "Assistant",
    "App",
  ];
  return (
    <div className="relative">
      <div className="flex items-center justify-between m-12">
        <Link href="#bottom"><Image src={'/logo.svg'} alt='img' height={50} width={50} className=" rounded-xl" /></Link>
        <ModeToggle />
      </div>
      <div className="fixed w-full">
        <div style={{ height: '600px', position: 'relative' }} >
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} items={AiAssistantsList} />
        </div>
      </div>
      <div  id="bottom" className="relative mt-[100vh] z-10 flex flex-col items-center justify-center h-screen bg-secondary/70 ">
        <MorphingText texts={texts} ></MorphingText>
        <h1 className="text-6xl md:text-9xl text-center">AI Assistants</h1>
      <Link href="/ai-assistants" className="mt-12 ">
          <Button className="cursor-pointer">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
