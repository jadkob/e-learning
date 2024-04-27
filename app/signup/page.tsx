"use client";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRef, useState } from "react";
import Loading from "../load";
import { useRouter } from "next/navigation";

export default function Signup() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
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
            setMessage("");
            setLoading(true);

            // Perform signup request
            axios
              .post("/api/signup", {
                username: username.current?.value,
                password: password.current?.value,
              })
              .then((res) => {
                // Set token cookie and redirect on success
                setCookie("token", res.data.token);
                router.push("/home");
              })
              .catch((err) => {
                // Display error message on failure
                setMessage(err.response.data);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {/* Display error message if exists */}
          {message && <h1>{message}</h1>}
          {/* Input fields for username and password */}
          <input
            type="text"
            className="input"
            placeholder="Username"
            ref={username}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            ref={password}
          />
          {/* Signup button */}
          <button className="input">Signup</button>
        </form>
      )}
    </>
  );
}
