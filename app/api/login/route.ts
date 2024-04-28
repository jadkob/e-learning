import { prisma } from "../prisma";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { username: user.username, id: user.id },
          "secret"
        );
        return Response.json(token, { status: 200 });
      } else {
        return new Response("Password is incorrect", { status: 400 });
      }
    } else {
      return new Response("Username is incorrect", { status: 404 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
