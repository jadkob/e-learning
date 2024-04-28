"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Loading from "../loadingComp";

export default function Signup() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/signup", {
        username: username.current?.value,
        password: password.current?.value,
      });
      setCookie("token", res.data);
      router.push("/home");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-screen items-center justify-center gap-[5vh]"
        >
          <p>{message}</p>
          <Input
            className="w-fit px-[5vw]"
            placeholder="Username"
            ref={username}
          />
          <Input
            placeholder="Password"
            className="w-fit px-[5vw]"
            ref={password}
            type="password"
          />
          <Button className="px-[5vw] text-[1.3rem]">SignUp</Button>
        </form>
      )}
    </>
  );
}
