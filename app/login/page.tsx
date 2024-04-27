"use client";
import axios from "axios";
import { useRef, useState } from "react";
import Loading from "../load";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Login() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form
          className="formV"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            axios
              .post("/api/login", {
                username: username.current?.value,
                password: password.current?.value,
              })
              .then((res) => {
                console.log(res.data);
                setCookie("token", res.data.token);
                router.push("/home");
              })
              .catch((err) => {
                setMessage(err.response.data);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {message && <h1>{message}</h1>}
          <input
            type="text"
            placeholder="Username"
            ref={username}
            className="input"
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            ref={password}
          />
          <button className="input">LogIn</button>
        </form>
      )}
    </>
  );
}
