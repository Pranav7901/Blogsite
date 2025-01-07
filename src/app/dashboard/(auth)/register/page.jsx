"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); 

  const [showpassword, setPassword] = useState(false);

  const router = useRouter();

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the specific field that changed
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
     

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

  const togglePasswordVisibility = () => {
    setPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          required
          value={formData.name}
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          className={styles.input}
          onChange={handleChange}
        />
        <div className={styles.inputWrapper}>
        <input
          type={showpassword ? "text " : "password"}
          placeholder="Password"
          required
          name="password"
          value={formData.password}
          className={styles.input}
          onChange={handleChange}
        />
         <button
        type="button"
        onClick={togglePasswordVisibility}
        className={styles.toggleButton}
        aria-label="Toggle Password Visibility"
      >
        {showpassword ? "Hide" : "Show"} 
      </button>
      </div>
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