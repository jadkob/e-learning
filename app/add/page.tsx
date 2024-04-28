"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Nav from "../Nav";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loading from "../loadingComp";

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const title = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLInputElement>(null);
  const subject = useRef<HTMLInputElement>(null);
  const ytLink = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            axios
              .post(
                "/api/courses",
                {
                  title: title.current?.value,
                  author: author.current?.value,
                  subject: subject.current?.value,
                  ytLink: ytLink.current?.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                alert("Added");
                router.push("/home");
              })
              .catch((err) => {
                console.log(err.response);

                setMessage(err.response.data);
              })
              .finally(() => setLoading(false));
          }}
          className="flex flex-col gap-[2vh] items-center"
        >
          {message && <h1>{message}</h1>}
          <Input placeholder="Title" ref={title} className="w-fit px-[5vw]" />
          <Input placeholder="Author" ref={author} className="w-fit px-[5vw]" />
          <Input
            placeholder="Subject"
            ref={subject}
            className="w-fit px-[5vw]"
          />
          <Input placeholder="YtLink" className="w-fit px-[5vw]" ref={ytLink} />
          <Button type="submit" className="px-[5vw] text-[1.3rem]">
            Add
          </Button>
        </form>
      )}
    </>
  );
}
