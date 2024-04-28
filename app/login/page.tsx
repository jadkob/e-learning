"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "../loadingComp";

export default function Login() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("/api/login", {
        username: username.current?.value,
        password: password.current?.value,
      });

      setCookie("token", res.data);
      router.push("/home");
    } catch (err: any) {
      console.log(err.response);
      setMessage(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col items-center justify-center w-full h-screen gap-[5vh]"
          onSubmit={handleSubmit}
        >
          {message && <p>{message}</p>}
          <Input
            placeholder="Username"
            ref={username}
            className="w-fit px-[5vw] "
          />
          <Input
            placeholder="Password"
            ref={password}
            type="password"
            className="w-fit px-[5vw]"
          />
          <Button type="submit" className="text-[1.3rem] px-[3vw]">
            LogIn
          </Button>
        </form>
      )}
    </div>
  );
}
