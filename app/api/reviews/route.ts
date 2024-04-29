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
    const { username, title, courseId, text, stars } = await req.json();
    if (
      !username ||
      !title ||
      !courseId ||
      !text ||
      !stars ||
      username === "" ||
      title === "" ||
      courseId === "" ||
      text === "" ||
      stars === ""
    ) {
      return new Response("Missing Fields", { status: 400 });
    }

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        titlle: title,
        text,
        stars,
        author: {
          connect: { username: existingUser.username }, // Connect to the user by username
        },
        course: {
          connect: { id: parseInt(courseId) }, // Ensure courseId is parsed to integer
        },
      },
    });

    if (review) {
      return new Response(JSON.stringify(review), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response("Error Creating Review", { status: 500 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
