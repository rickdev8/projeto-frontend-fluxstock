"use client";

import Image from "next/image";
import { ButtonHome } from "../buttons/ButtonHome";
import styles from "./header.module.css";


export const Header = () => {


  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Sistema de Controle de Estoque</h1>
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>
          Com o Flux Stock, você gerencia o estoque da sua loja com praticidade
          em qualquer dispositivo — celular, tablet ou computador. Cadastre
          produtos, controle categorias e registre movimentações de forma rápida
          e eficiente, garantindo mais organização e agilidade para o seu
          negócio.
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <ButtonHome
          name={"Começar agora"}
          style={styles.ctaButton}
        />
      </div>
      <Image width={400} height={400} alt="seila" src={"/animatehome.gif"} />
    </div>
  );
};
