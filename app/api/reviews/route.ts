import * as jwt from "jsonwebtoken";
import { prisma } from "../prisma";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (!jwt.verify(token, process.env.SECRET as string)) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { authorId, title, courseId, text, stars } = await req.json();
    const review = await prisma.review.create({
      data: {
        authorId,
        titlle: title,
        courseId,
        text,
      },
    });
    if (review) {
      return Response.json(review);
    } else {
      return new Response("Error Creating Review", { status: 500 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
