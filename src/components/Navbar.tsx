import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar">
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      <div className="navlinks">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}
