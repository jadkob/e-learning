import * as jwt from "jsonwebtoken";
import { authenticate } from "../authenticate";
import { prisma } from "@/app/prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1] as string;
    if (!(await authenticate(token))) {
      return new Response("Unauthorized", { status: 401 });
    }
    const courses = await prisma.course.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
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
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1] as string;
    const { title, text, authorId, subject, ytLink } = await req.json();
    const decoded: any = jwt.decode(token);
    if (!(await authenticate(token))) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!title || !text || !authorId || !subject || !ytLink) {
      return new Response("Missing required fields", { status: 400 });
    }
    if (decoded.username == "admin") {
      const course = await prisma.course.create({
        data: {
          title,
          text,
          authorId,
          subject,
          ytLink,
        },
      });
      if (course) {
        return Response.json(course);
      } else {
        return new Response("Course not created", { status: 500 });
      }
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
