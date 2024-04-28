import { prisma } from "../../prisma";
import * as jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!jwt.verify(token, process.env.SECRET!)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { subject } = await req.json();
    const courses = await prisma.course.findMany({
      where: {
        subject: {
          equals: subject,
          mode: "insensitive",
        },
      },
    });
    if (courses.length > 0) {
      return Response.json(courses);
    } else {
      return new Response("Courses not found", { status: 500 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
