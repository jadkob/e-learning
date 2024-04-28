import { prisma } from "../../prisma";

export async function POST(req: Request) {
  const { id } = await req.json();
  const course = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (course) {
    return Response.json(course);
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
