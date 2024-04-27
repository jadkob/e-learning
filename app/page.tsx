import Link from "next/link";
import "./globals.css";
export default function Index() {
  return (
    <div className="formH">
      <Link href={"/login"} className="input">
        LogIn
      </Link>
      <Link href={"/signup"} className="input">
        SignUp
      </Link>
    </div>
  );
}
