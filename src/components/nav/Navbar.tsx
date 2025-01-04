"use client"
import React from 'react'
import Link from 'next/link';
import styles from './Navbar.module.css'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAuthAction = async () => {
    if (session) {
      // User is logged in, handle logout
      await signOut();
    } else {
      // User is not logged in, handle login
      
      router.push("/dashboard");
    }
  };

    const links = [
        {
          id: 1,
          title: "Home",
          url: "/",
        },
        {
          id: 2,
          title: "Portfolio",
          url: "/portfolio",
        },
        {
          id: 3,
          title: "Blog",
          url: "/blog",
        },
        {
          id: 4,
          title: "About",
          url: "/about",
        },
        {
          id: 5,
          title: "Contact",
          url: "/contact",
        },
        {
          id: 6,
          title: "Dashboard",
          url: "/dashboard",
        },
      ];
  return (
    <div className={styles.container}>
        <Link href="/" className={styles.logo}>BlogMania</Link>
        <DarkModeToggle/>
    <div className={styles.links}>
        {links.map((link) => (
        <Link key={link.id} href={link.url} >
          {link.title}
        </Link>

      ))}
      <button className={styles.logout} onClick={handleAuthAction}>
      {session ? "Logout" : "Login"}
    </button>
      </div>
      </div>
  )
}

export default Navbar