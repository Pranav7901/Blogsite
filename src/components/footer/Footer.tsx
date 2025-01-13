
import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'


const Footer = () => {
  return (
    <div className={styles.container}>
        <div>@2024 Made By Pranav More<br></br>Contact:7038637629<br></br>.All rights reserved</div>
        <div>
            <div className={styles.images}>
              <Image src="/1.png"  height={15} width={15} className={styles.icon} alt='Lama Dev' ></Image>
              <Image src="/2.png"  height={15} width={15} className={styles.icon} alt='Lama Dev' ></Image>
              <Image src="/3.png"  height={15} width={15} className={styles.icon} alt='Lama Dev' ></Image>
              <Image src="/4.png"  height={15} width={15} className={styles.icon} alt='Lama Dev' ></Image>
            </div>
        </div>

    </div>
  )
}

export default Footer