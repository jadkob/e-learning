import { prisma } from "@/app/prisma";

export async function PUT(req: Request) {
  try {
    const { title, text, subject, courseId } = await req.json();

    // Construct the update object with conditional updates
    const updateData: any = {};
    if (title !== "") {
      updateData["title"] = title;
    }
    updateData["text"] = text;
    updateData["subject"] = subject;

    // Update the course in the database
    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: updateData,
    });

    // Return a success response with the updated course
    if (updatedCourse) {
      return Response.json(updatedCourse);
    } else {
      return new Response("Course not updated", { status: 500 });
    }
  } catch (error: any) {
    // Handle any errors that may occur during the update process
    return new Response(error.message, { status: 500 });
  }
}
