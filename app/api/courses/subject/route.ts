import { prisma } from "../../prisma";

export async function POST(req: Request) {
  try {
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
