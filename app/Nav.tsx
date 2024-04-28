import Link from "next/link";
import * as jwt from "jsonwebtoken";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Nav() {
  const token = getCookie("token");
  const [username, setUsername] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const decoded: any = jwt.decode(token as string);
    setUsername(decoded?.username);
  }, []);
  return (
    <nav className="mb-[10vh] flex justify-center gap-[10vw]">
      <Link href={"/home"}>Home</Link>
      {username == "admin" && <Link href={"/add"}>Add</Link>}
      <button
        onClick={() => {
          deleteCookie("token");
          router.push("/");
        }}
      >
        Logout
      </button>
    </nav>
  );
}
