import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password || username === "" || password === "") {
      return new Response("Username and password are required", {
        status: 400,
      });
    }
    const userCheck = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (userCheck) {
      return new Response("Username already exists", { status: 400 });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          process.env.SECRET as string
        );
        return Response.json(token);
      } else {
        return new Response("Error creating user", { status: 500 });
      }
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
