"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import Nav from "../Nav";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const title = useRef<HTMLInputElement>(null);
  const author = useRef<HTMLInputElement>(null);
  const subject = useRef<HTMLInputElement>(null);
  const ytLink = useRef<HTMLInputElement>(null);
  return (
    <>
      <Nav />
      <form
        onSubmit={(e) => {
          axios
            .post(
              "/api/courses",
              {
                title,
                author,
                subject,
              },
              {
                headers: {
                  Authorization: `Bearer ${getCookie("token")}`,
                },
              }
            )
            .then((res) => {
              alert("Added");
            })
            .catch((err) => {
              alert("Error");
            });
        }}
        className="flex flex-col gap-[2vh] items-center"
      >
        <Input placeholder="Title" ref={title} className="w-fit px-[5vw]" />
        <Input placeholder="Author" ref={author} className="w-fit px-[5vw]" />
        <Input placeholder="Subject" ref={subject} className="w-fit px-[5vw]" />
        <Input placeholder="YtLink" className="w-fit px-[5vw]" ref={ytLink} />
        <Button type="submit" className="px-[5vw] text-[1.3rem]">
          Add
        </Button>
      </form>
    </>
  );
}
