import { prisma } from "../../prisma";
import * as jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { courseId } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!jwt.verify(token, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const course = await prisma.course.findUnique({
      where: {
        id: Number(courseId),
      },
    });
    if (!course) {
      return new Response("Course not found", { status: 404 });
    }
    const reviews = await prisma.review.findMany({
      where: {
        courseId: Number(courseId),
      },
    });
    if (reviews.length > 0) {
      return Response.json(reviews);
    } else {
      return new Response("No Reviews For This Course Yet", { status: 404 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
