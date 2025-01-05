"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const schema = z.object({
     
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const [result, setResult] = useState("");

  // Handle query parameters
  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  // Redirect if the user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    try {
      let validatedResult =   schema.safeParse(formData);
    if (!validatedresult.success) {
      // Extract the error message
      const errorMessage = validatedresult.error.errors[0]?.message;
      setResult(errorMessage); // Update the state with the error message
    } else {
      // Validation succeeded
      setResult("Form submitted successfully!");
    }} catch (err) {
      setError(err);
      console.log(err);
    }

    signIn("credentials", {
      email,
      password,
    });
  
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button className={styles.button}>Login</button>
        {error && <p className={styles.error}>{`${result}`}</p>}
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={`${styles.button} ${styles.google}`}
      >
        Login with Google
      </button>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/register">
        Create new account
      </Link>
     
    </div>
  );
};

export default Login;