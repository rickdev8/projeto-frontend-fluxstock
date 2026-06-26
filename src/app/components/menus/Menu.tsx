"use client";

import styles from "./menu.module.css";
import { AiOutlineProduct } from "react-icons/ai";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaPerson } from "react-icons/fa6";
import { IoPersonAddOutline } from "react-icons/io5";
import { BiBarChart } from "react-icons/bi";
import { MdExitToApp } from "react-icons/md";

import Link from "next/link";
import { useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter, usePathname } from "next/navigation";
import { IoMdPrint } from "react-icons/io";

const Menu = () => {
  const router = useRouter();
  const pathname = usePathname(); // rota atual
  const { token } = parseCookies();

  // Verifica token ao montar componente
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  // Função de logout
  const handleLogout = () => {
    destroyCookie(null, "token", { path: "/" });
    router.push("/login");
  };

  // Configuração das opções
  const menuItems = [
    {
      href: "/dashboard/PurchaseOrderTable",
      label: "Vender",
      icon: <RiShoppingBagLine size={25} />,
    },
    {
      href: "/dashboard/homepage",
      label: "Produtos",
      icon: <AiOutlineProduct size={25} />,
    },
    {
      href: "/dashboard/Client",
      label: "Clientes",
      icon: <FaPerson size={25} />,
    },
    {
      href: "/dashboard/Fornecedores",
      label: "Fornecedores",
      icon: <IoPersonAddOutline size={25} />,
    },
    {
      href: "/dashboard/statistics",
      label: "Estatísticas",
      icon: <BiBarChart size={25} />,
    },
    {
      href: "/dashboard/Impressao",
      label: "Impressao",
      icon: <IoMdPrint size={25} />,
    },
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.profile}>
        <img
          src="/profile.jpg"
          alt="Foto de Perfil"
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <h4 className={styles.profileName}>RG MULTIMARCAS</h4>
          <span className={styles.profileId}>ID: 123456</span>
        </div>
        <div className={styles.profileInfo}>
          <button onClick={handleLogout}>
            <MdExitToApp
              color="#7c3aed"
              style={{ cursor: "pointer" }}
              size={25}
            />
          </button>
        </div>
      </div>

      <div className={styles.menuOptions}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-pressed={isActive ? "true" : "false"}
              className={`${styles.menuLink} ${isActive ? styles.active : ""}`}
            >
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.linkText}>{item.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
