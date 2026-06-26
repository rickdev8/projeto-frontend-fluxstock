"use client";

import { PiBarcodeLight } from "react-icons/pi";
import JsBarcode from "jsbarcode";
import styles from "./print.module.css";
import { useEffect, useState } from "react";
import { filtrarProdutos } from "@/app/utils/FilterProducts";
import { IoPrint } from "react-icons/io5";
import { Product } from "../Context/ProdutoContext";

export type PropsProduct = {
  produtos: any[];
};

export const PrintSection = ({ produtos }: PropsProduct) => {
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});

  const handleChangeQuantidade = (id: string, value: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const HandlePrint = (produto: any) => {
    const quantidade = quantidades[produto.id] ?? produto.quantidade;

    const novaAba = window.open("", "_blank", "width=900,height=700");
    if (!novaAba) return;

    const style = novaAba.document.createElement("style");
    style.innerHTML = `
  @page {
    size: A4;
    margin: 15mm;
  }

  body { 
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 10px;
    background: #f9f9f9;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr; /* 1 coluna */
    gap: 10px; /* aumenta espaço entre as etiquetas */
    justify-items: center;
  }

  .etiqueta { 
    border: 1px dashed #aaa; 
    width: 800px; 
    height: 250px; /* altura maior */
    padding: 15px; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    align-items: center; 
    font-size: 14px; 
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    background: white;
    border-radius: 6px;
    page-break-inside: avoid;
    gap: 10px; /* mais espaço interno */
  }

  .details {
    font-weight: bold;
    text-align: center;
    font-size: 26px;
    line-height: 1.3;
  }

  svg {
    margin-top: 5px;
  }

  button { 
    display: block; 
    margin: 20px auto; 
    padding: 10px 18px; 
    background: #7c3aed; 
    color: white; 
    border: none; 
    cursor: pointer; 
    border-radius: 6px; 
    font-size: 14px;
    font-weight: bold;
  }

  button:hover {
    background: #5b21b6;
  }

  .title {
   font-weight: bold;
    text-align: center;
    font-size: 26px;
    line-height: 1.3;
  }

  @media print {
    button { display: none; }
    body { background: white; padding: 0; }
    .container { gap: 35px; } /* menos etiquetas por página */
    .etiqueta {
      box-shadow: none;
      border: 1px solid #000;
    }
  }
  `;
    novaAba.document.head.appendChild(style);

    const container = novaAba.document.createElement("div");
    container.classList.add("container");

    const printButton = novaAba.document.createElement("button");
    printButton.textContent = "Imprimir Etiquetas";
    printButton.onclick = () => novaAba.print();
    novaAba.document.body.appendChild(printButton);

    novaAba.document.body.appendChild(container);

    for (let i = 0; i < quantidade; i++) {
      const etiqueta = novaAba.document.createElement("div");
      etiqueta.classList.add("etiqueta");
      etiqueta.innerHTML = `
      <div><strong class="title">${produto.nomeProduto}</strong></div>
      <div class="details">
        Preço venda: R$${produto.precoVenda / 100} <br/>
        ${produto.categoria} - ${produto.descricao}
      </div>
      <svg id="barcode-${produto.barCode}-${i}"></svg>
    `;
      container.appendChild(etiqueta);

      const svg = novaAba.document.getElementById(
        `barcode-${produto.barCode}-${i}`
      );
      if (svg) {
        JsBarcode(svg, produto.barCode, {
          format: "CODE128",
          lineColor: "#000",
          width: 5, 
          height: 100, 
          displayValue: true,
          fontSize: 20,
          margin: 2,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Produto</th>
            <th className={styles.th}>Quantidade</th>
            <th className={styles.th}>Código de Barras</th>
            <th className={styles.th}>Imprimir</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto: Product) => (
            <tr key={produto.id}>
              <td className={styles.td}>{produto.nomeProduto}</td>
              <td className={styles.td2}>
                <div className={styles.tdAction}>
                  <span className={styles.quantidade}>
                    {produto.quantidade <= 0 ? "0" : produto.quantidade}
                  </span>
                  <label>Alterar: </label>
                  <input
                    value={
                      produto.quantidade <= 0
                        ? "0"
                        : quantidades[produto.id] ?? produto.quantidade
                    }
                    type="number"
                    className={styles.input}
                    placeholder="Digite a quantidade"
                    onChange={(e) =>
                      handleChangeQuantidade(produto.id, Number(e.target.value))
                    }
                  />
                </div>
              </td>

              <td className={styles.td}>
                <svg
                  id={`barcode-${produto.barCode}`}
                  className={styles.barcode}
                ></svg>
              </td>
              <td className={styles.td}>
                <IoPrint
                  color="#7c3aed"
                  style={{ cursor: "pointer" }}
                  size={30}
                  onClick={() => HandlePrint(produto)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
