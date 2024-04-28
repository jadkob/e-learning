"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-[10vw] items-center justify-center w-full h-screen">
      <Button asChild className="px-[5vw] text-[1.5rem]">
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button asChild className="px-[5vw] text-[1.5rem]">
        <Link href={"/signup"}>SignUp</Link>
      </Button>
    </div>
  );
}
