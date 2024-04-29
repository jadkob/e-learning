"use client";
import Nav from "@/app/Nav";
import Loading from "@/app/loadingComp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course, Review } from "@prisma/client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as jwt from "jsonwebtoken";

export default function CourseFunc() {
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviewws] = useState<Review[]>([]);
  const [message, setMessage] = useState<string>("");
  const { id } = useParams();
  const title = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const stars = useRef<HTMLInputElement>(null);
  const token = getCookie("token");
  const decoded: any = jwt.decode(token as string);
  const userId = decoded.id;
  const getReviews = () => {
    axios
      .post(
        `/api/reviews/get`,
        { courseId: id },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      )
      .then((res) => {
        setReviewws(res.data);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  useEffect(() => {
    setLoading(true);
    axios.post(`/api/courses/course`, { id }).then((res) => {
      setCourse(res.data);
      setLoading(false);
    });
    getReviews();
  }, []);
  return (
    <>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-full h-screen items-center justify-center">
          <iframe className="w-[80%] h-[90%]" src={course?.ytLink}></iframe>
          <h1 className="text-[2rem]">Title: {course?.title}</h1>
          <h2 className="text-[1.5rem]">Author: {course?.author}</h2>
          <h3 className="text-[1.3rem]">Subject: {course?.subject}</h3>
          <h1 className="mt-[10vh] text-[2rem] font-bold">Reviews: </h1>
          <form
            className="flex flex-col items-center mb-[5vh]"
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post(
                  "/api/reviews",
                  {
                    courseId: course?.id,
                    authorId: userId,
                    title: title.current?.value,
                    text: text.current?.value,
                    stars: stars.current?.value,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                )
                .then((res) => {
                  alert("Review added");
                  getReviews();
                });
            }}
          >
            <Input placeholder="Title" ref={title} className="px-[5vw] w-fit" />
            <Input placeholder="Text" ref={text} className="px-[5vw] w-fit" />
            <Input
              placeholder="Rating"
              className="px-[5vw] w-fit"
              type="number"
              ref={stars}
            />
            <Button>Add Review</Button>
          </form>
          <div className="flex flex-col items-center justify-center gap-[5vh]">
            {reviews.map((review) => (
              <div key={review.id}>
                <h1 className="text-[2rem]">Stars: {review.stars}</h1>
                <h1 className="text-[1.5rem]">Title: {review.titlle}</h1>
                <h2 className="text-[1.5rem]">Text: {review.text}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
