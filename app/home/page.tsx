"use client";
import { Course } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Loading from "../loadingComp";
import { getId } from "../getId";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Nav from "../Nav";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/courses", {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        setMessage(err.response.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Nav />
      {loading ? <Loading /> : <div>{message && <h1>{message}</h1>}</div>}
      <div className="w-full flex flex-col gap-[5vh] items-center">
        {courses.map((course) => (
          <div className="flex flex-col items-center gap-[3vh]">
            <img
              src={`http://img.youtube.com/vi/${getId(course.ytLink)}/0.jpg`}
              alt="Youtube Thumbnail"
              width={300}
            />
            <h1 className="text-[2rem] font-bold text-center">
              Title: {course.title}
            </h1>
            <Button asChild className="text-[1.5rem]">
              <Link href={`/course/${course.id}`}>View Course</Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
