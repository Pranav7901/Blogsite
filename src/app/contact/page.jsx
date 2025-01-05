"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/button";
import Imgcontact from "@/assets/contact.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage("Your message has been sent!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setResponseMessage("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src={Imgcontact} alt="" fill={true} className={styles.image} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <textarea
            name="message"
            className={styles.textArea}
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            cols={30}
            rows={10}
            required
          ></textarea>
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
        {responseMessage && <p className={styles.responseMessage}>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default Contact;