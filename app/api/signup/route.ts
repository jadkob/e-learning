import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const userCheck = await prisma.user.findFirst({ where: { username } });
    if (!username || !password) {
      return new Response("Username and password are required", {
        status: 400,
      });
    }
    if (userCheck) {
      return new Response("Username already exists", { status: 400 });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPass,
        },
      });
      if (user) {
        const token = jwt.sign(
          { userId: user.id, username: username },
          "secret"
        );
        return Response.json({
          message: "User created",
          token,
        });
      } else {
        return new Response("There was an error creating user", {
          status: 500,
        });
      }
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
