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
import { useRouter } from "next/navigation";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (selectedSubject !== "") {
      router.push(`/home/${selectedSubject}`);
    }
  }, [selectedSubject]);
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

  const subjects = ["Math", "Biology", "English", "Physics", "Chemistry"];

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="py-[3vh]">
      <Nav />
      {loading ? (
        <Loading />
      ) : message ? (
        <h1>{message}</h1>
      ) : (
        <>
          <div className="flex justify-center gap-[5vw] mb-[10vw]">
            <select value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select a subject...</option>
              {subjects.map((subject: string) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col gap-[5vh] items-center">
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col items-center gap-[3vh] text-center"
              >
                <img
                  src={`http://img.youtube.com/vi/${getId(
                    course.ytLink
                  )}/0.jpg`}
                  alt="Youtube Thumbnail"
                  width={300}
                />
                <h1 className="text-[2rem] font-bold text-center truncate max-w-[90vw] break-all">
                  Title: {course.title}
                </h1>
                <h2 className="text-center text-[1.5rem] truncate max-w-[30vw]">
                  Subject: {course.subject}
                </h2>
                <Button asChild className="text-[1.5rem]">
                  <Link href={`/course/${course.id}`}>View Course</Link>
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
