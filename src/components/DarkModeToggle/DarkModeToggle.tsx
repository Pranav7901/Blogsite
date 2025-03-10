"use client"

import React, { useContext } from "react";
import styles from "./DarkModeToggle.module.css";
import { ToggleProvider } from "@/context/ToggleProvoider";
import { useToggle } from "@/context/ToggleProvoider";
;


const DarkModeToggle = () => {
    const { mode, toggle } = useToggle();
  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div
        className={styles.ball} style={mode === "light" ? {left:"2px"} : {right:"2px"} }
        
      />
    </div>
  );
};

export default DarkModeToggle;