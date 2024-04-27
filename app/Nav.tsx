import Link from "next/link";
import * as jwt from "jsonwebtoken";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Nav() {
  const decoded: any = jwt.decode(getCookie("token")!);
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!getCookie("token")) {
      alert("Please login");
      router.push("/");
    } else {
      setUsername(decoded.username);
    }
  }, []);
  return (
    <nav className="flex justify-center gap-[10vw] mb-[5vh]">
      <Link href="/home">Home</Link>
      {username == "admin" && <Link href="/add">Add</Link>}
      <button
        onClick={() => {
          deleteCookie("token");
          deleteCookie("username");
          router.push("/");
        }}
      >
        LogOut
      </button>
    </nav>
  );
}
