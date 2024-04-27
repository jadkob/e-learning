import { prisma } from "@/app/prisma";
import * as jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const authHeader = req.headers.get("Authorization");
    const token: any = authHeader && authHeader.split(" ")[1];
    if (!(await jwt.verify(token, "secret"))) {
      return new Response("Unauthorized", { status: 401 });
    }
    const course = await prisma.course.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (course) {
      return Response.json(course);
    } else {
      return new Response("Course not found", { status: 404 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
