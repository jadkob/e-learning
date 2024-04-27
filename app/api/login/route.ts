import { prisma } from "@/app/prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return new Response("Username and password required", { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user.id, username: username },
          "secret"
        );
        return Response.json({
          message: "loggedIn",
          token,
        });
      } else {
        return new Response("Invalid credentials", { status: 400 });
      }
    } else {
      return new Response("Invalid credentials", { status: 400 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
