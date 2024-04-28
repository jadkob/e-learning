"use client";
import Nav from "@/app/Nav";
import Loading from "@/app/loadingComp";
import { Course } from "@prisma/client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseFunc() {
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.post(`/api/courses/course`, { id }).then((res) => {
      setCourse(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full h-screen items-center justify-center">
          <iframe
            className="w-[80%] h-[80%]"
            src={course?.ytLink !== "" ? course?.ytLink : ""}
          ></iframe>
          <h1 className="text-[2rem]">Title: {course?.title}</h1>
          <h2 className="text-[1.5rem]">Author: {course?.author}</h2>
          <h3 className="text-[1.3rem]">Subject: {course?.subject}</h3>
        </div>
      )}
    </>
  );
}
