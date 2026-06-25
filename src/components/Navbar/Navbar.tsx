"use client";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="navbar">
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <div className="navLinks-middle-part">
        <Link href="/features">Features</Link>
        <Link href="/howItWorks">How it works</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/tools">Tools</Link>
      </div>
      <div className="navLinks-last-part">
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
