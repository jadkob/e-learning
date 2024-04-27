"use client";
import { useEffect, useRef, useState } from "react";
import * as jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../load";
import Nav from "../Nav";

export default function Add() {
  const [loading, setLoading] = useState(false);
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const ytLink = useRef<HTMLInputElement>(null);
  const subject = useRef<HTMLInputElement>(null);
  const token = getCookie("token") as string;
  const decoded: any = jwt.decode(token);
  const [authorId, setAuthorId] = useState();
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const decoded: any = jwt.decode(token);
    console.log(decoded);
    if (token) {
      setAuthorId(decoded.userId);
    }
  }, []);
  return (
    <>
      <Nav />
      <div className="p-[5vw]">
        {message && <h1>{message}</h1>}
        {loading ? (
          <Loading />
        ) : (
          <form
            className="formV"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setMessage("");
              axios
                .post(
                  "/api/courses",
                  {
                    title: title.current?.value,
                    text: text.current?.value,
                    authorId: authorId,
                    subject: subject.current?.value,
                    ytLink: ytLink.current?.value,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                )
                .then((res) => {})
                .catch((err) => {
                  setMessage(err.response.data);
                })
                .finally(() => setLoading(false));
            }}
          >
            <input
              type="text"
              className="input"
              placeholder="Title"
              ref={title}
              required
            />
            <input
              type="text"
              required
              placeholder="Text"
              className="input"
              ref={text}
            />
            <input
              type="text"
              required
              placeholder="subject"
              ref={subject}
              className="input capitalize"
            />
            <input
              required
              className="input"
              type="text"
              placeholder="YtLink"
              ref={ytLink}
            />
            <button className="input">Create</button>
          </form>
        )}
      </div>
    </>
  );
}
