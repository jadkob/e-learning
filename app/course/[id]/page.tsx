"use client";
import Nav from "@/app/Nav";
import { Course } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseFunc() {
  const { id } = useParams();
  const [course, ssetCourse] = useState<Course>();
  useEffect(() => {
    axios
      .post(
        "/api/courses/get",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        ssetCourse(res.data);
      });
  }, []);
  return (
    <>
      <Nav />
      <div className="w-full h-screen flex  items-center justify-center flex-col gap-[5vh]">
        <iframe src={course?.ytLink} width={600} height={400}></iframe>
        <h1 className="text-[2rem] text-center">Title: {course?.title}</h1>
      </div>
    </>
  );
}
