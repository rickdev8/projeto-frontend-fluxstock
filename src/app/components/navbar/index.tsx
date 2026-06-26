"use client";
import { IoIosArrowDown } from "react-icons/io";

import Image from "next/image";
import styles from "./navbar.module.css";
import { ButtonNav } from "../buttons/ButtonNav";
import Link from "next/link";

const pages = ["Soluções", "Segmentos", "Planos", "Ajuda"];

function ResponsiveAppBar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.logoNavContainer}>
        <Image
          src="/logotipo/fluxstock.png"
          width={85}
          height={85}
          alt="logotipo"
        />

        <nav className={styles.navLinks}>
          {pages.map((page, index) => (
            <div key={index} className={styles.divNavLinkandButton}>
              <Link key={page} href="#" className={styles.navLink}>
                {page}
              </Link>
              <IoIosArrowDown />
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.actions}>
        <Link href={"/login"}>
          <ButtonNav style={styles.loginButton} name={"Entrar na Flux Stock"} />
        </Link>
      </div>
    </header>
  )
  
}

export default ResponsiveAppBar;
