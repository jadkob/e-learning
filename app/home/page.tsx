"use client";
import { Course } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Loading from "../load";
import { getYoutubeId } from "../getId";
import Link from "next/link";
import Nav from "../Nav";
import { useRouter } from "next/navigation";
export default function Home() {
  const [coursez, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setMessage("");
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
          if (err.response.status === 404) {
            setMessage("No courses found");
          } else {
            setMessage(err.response.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchPosts();
  }, []);
  return (
    <div className="px-[5vw]">
      <Nav />
      {message ? (
        <h1 className="text-center text-[2rem] mt-[30vh]">{message}</h1>
      ) : loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-[10vh]">
          {coursez.map((course) => (
            <div
              key={course.id}
              className="text-center text-[1.2rem] flex items-center justify-center flex-col capitalize"
            >
              <img
                src={`http://img.youtube.com/vi/${getYoutubeId(
                  course.ytLink
                )}/0.jpg`}
                alt="thumbnail"
                width={300}
                className="flex flex-col items-center justify-center gap-[3vh]"
              />
              <h1 className="text-[1.5rem] font-bold max-w-[90vw] break-all truncate text-center">
                Title: {course.title}
              </h1>

              <h2 className="text-[1.3rem]">Subject: {course.subject}</h2>
              <Link href={`/course/${course.id}`} className="input">
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
