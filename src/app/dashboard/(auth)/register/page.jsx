"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); 

  const router = useRouter();

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };  

    try {
      let validatedresult =   schema.safeParse(formData);
      
    if (!validatedresult.success) {
      // Extract the error message
      const errorMessage = validatedresult.error.errors[0]?.message;
      setResult(errorMessage); // Update the state with the error message
    } else {
      // Validation succeeded
      setResult("Form submitted successfully!");
    }
      
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/dashboard/login?success=Account has been created");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          required
          className={styles.input}
        />
        <input
          type="text"
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
        <button className={styles.button}>Register</button>
        {error && `${result}`}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/dashboard/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;