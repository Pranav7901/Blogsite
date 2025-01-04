"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    session?.user?.name ? `/api/posts?username=${session.user.name}` : null,
    fetcher
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.user.name,
        }),
      });
      mutate(); // Refresh the data
      e.target.reset();
    } catch (err) {
      console.error("Failed to add post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      mutate(); // Refresh the data
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Failed to load posts. Please try again later.</p>
          ) : (
            data?.map((post) => (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image src={post.img} alt="Post Image" width={200} height={100} />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.delete}
                  onClick={() => handleDelete(post._id)}
                >
                  X
                </span>
              </div>
            ))
          )}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image URL" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }

  return null;
};

export default Dashboard;