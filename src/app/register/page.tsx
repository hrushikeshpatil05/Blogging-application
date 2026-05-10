"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      // create user in firebase
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      setName("");
      setEmail("");
      setPassword("");

      router.push("/login");
    } catch (err: any) {
      if (err.code === "auth/email-already-exists") {
        setError("This email is already registered. Please login.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit} className="register-container">
        {error && (
          <div className="alert-box">
            <p>{error}</p>
            <button onClick={() => setError("")}>x</button>
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
