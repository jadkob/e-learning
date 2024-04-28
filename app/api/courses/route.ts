import * as jwt from "jsonwebtoken";
import { prisma } from "../prisma";
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!jwt.verify(token, "secret")) {
      return new Response("Unauthorized", { status: 401 });
    }
    const courses = await prisma.course.findMany();
    if (courses.length > 0) {
      return Response.json(courses);
    } else {
      return new Response("No courses found", { status: 404 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { title, ytLink, subject, author } = await req.json();
    if (
      !title ||
      !ytLink ||
      !subject ||
      !author ||
      title == "" ||
      ytLink == "" ||
      subject == "" ||
      author == ""
    ) {
      return new Response("Missing required fields", { status: 400 });
    }
    const course = await prisma.course.create({
      data: { title, ytLink, subject, author },
    });
    if (course) {
      return Response.json(course);
    } else {
      return new Response("Server error, course not created", { status: 404 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
