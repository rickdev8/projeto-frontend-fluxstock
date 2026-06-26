import { useState } from "react";
import styles from "./bolinhas.module.css";

interface BolinhaProgressaoProps {
  atual: number;
  max?: number;
}

export const BolinhaProgressao = ({
  atual,
  max = 4,
}: Readonly<BolinhaProgressaoProps>) => {


  return (
    <div className={styles.pai}>
      {new Array(max).fill(0).map((_, index: number) => (
        <div className={styles.bool} key={index}>
          <div
            className={`${styles.bolinha} ${
              index < atual ? styles.bolinhaAtive : ""
            }`}
          ></div>
          {index + 1 == max ? null : (
            <div
              className={`${styles.traco} ${
                index + 1 < atual ? styles.tracoAtive : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};
