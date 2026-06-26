"use client";

import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Product } from "../Context/ProdutoContext";
import styles from "./TableProduct.module.css";
import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { PiBarcodeLight } from "react-icons/pi";

function generateBarcode(
  element: SVGSVGElement | null,
  value: string,
  options?: Partial<JsBarcode.Options>
) {
  if (element) {
    JsBarcode(element, value, {
      format: "CODE128",
      lineColor: "#000",
      width: 1,
      height: 40,
      displayValue: true,
      ...options,
    });
  }
}

function getCategoryEmojiLink(category: string): string {
  switch (category.toLowerCase()) {
    case "camisas":
      return "https://sportbras.vtexassets.com/arquivos/ids/1229578-800-auto?v=638739332652930000&width=800&height=auto&aspect=true";
    case "meias":
      return "https://images.yampi.me/assets/stores/maniadefutsal/uploads/images/meia-esportiva-antiderrapante-mania-de-futsal-pretobranco-667d50351893c-medium.jpg";
    case "shorts":
      return "https://em-content.zobj.net/thumbs/240/apple/354/shorts_1fa73.png";
    case "calçados":
      return "https://images.emojiterra.com/twitter/v13.1/512px/1f45f.png";
    case "bones":
      return "https://em-content.zobj.net/thumbs/240/apple/354/billed-cap_1f9e2.png";
    case "blusas":
      return "https://em-content.zobj.net/thumbs/240/apple/354/womans-clothes_1f45a.png";
    case "acessorios":
      return "https://images.tcdn.com.br/img/img_prod/801617/oculos_de_sol_oakley_oo9403_0336_sphaera_matte_black_prizm_road_original_10278_1_f93573f60208f4a74738a8157233143e.jpg";
    case "calcas":
      return "https://decathlonstore.vtexassets.com/unsafe/fit-in/628x628/center/middle/https%3A%2F%2Fdecathlonpro.vtexassets.com%2Farquivos%2Fids%2F2918854-628-628%2Fcalca-modular-masculina-travel-100-verde-militar-escuro-422.jpg%3Fv%3D637686077712870000";
    case "perfumes":
      return "https://i.pinimg.com/736x/a4/69/b7/a469b7e3c9cdeb6230478e9b45887e49.jpg";
    case "blusas":
      return "https://acdn-us.mitiendanube.com/stores/002/822/533/products/1_preta-0755e2520fcde918b516780560897023-1024-1024.jpg";
    case "acessorios":
      return "https://images.tcdn.com.br/img/img_prod/1255763/perfume_the_icon_supreme_edp_intense_perfume_masc_50ml_9283_1_faf4526065bf85cb185a82bc5d3ef597.jpg";
    default:
      return "https://em-content.zobj.net/thumbs/240/apple/354/question-mark_2753.png";
  }
}

interface ProductTable {
  product: Product[];
  EditProduct: (id: string) => void;
  DeleteProduct: (id: string) => void;
}

export const TableProduct = ({
  product,
  EditProduct,
  DeleteProduct,
}: ProductTable) => {
  const [produtos, setProdutos] = useState(product);
  const [viewCodeBars, setViewCodeBars] = useState<Record<string, boolean>>({});

  const barcodeRefs = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    setProdutos(product);
    const initialView: Record<string, boolean> = {};
    product.forEach((p) => (initialView[p.id] = false));
    setViewCodeBars(initialView);
  }, [product]);

  useEffect(() => {
    produtos.forEach((p, i) => {
      if (viewCodeBars[p.id]) {
        generateBarcode(barcodeRefs.current[i], p.barCode, {
          lineColor: "#000",
          height: 50,
        });
      }
    });
  }, [produtos, viewCodeBars]);

  const toggleBarcode = (id: string) => {
    setViewCodeBars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <tbody>
      {produtos.map((produto, index) => (
        <React.Fragment key={produto.id}>
          <tr>
            <td className={styles.productName}>
              <img
                className={styles.avatar}
                src={getCategoryEmojiLink(produto.categoria)}
                alt={produto.nomeProduto}
              />
            </td>
            <td>{produto.nomeProduto}</td>
            <td>{produto.categoria}</td>
            <td>
              {(produto.preco / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td>
              {(produto.precoVenda / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td>{produto.quantidade}</td>
            <td>{produto.descricao}</td>
            <td className={styles.actionsCol}>
              <button
                className={styles.bar}
                onClick={() => toggleBarcode(produto.id)}
              >
                <PiBarcodeLight size={16} strokeWidth={7} />
              </button>
              <button
                className={styles.bar}
                onClick={() => EditProduct(produto.id)}
              >
                <FiEdit2 size={16} className={styles.editIcon} />
              </button>
              <button onClick={() => DeleteProduct(produto.id)}>
                <FiTrash2 size={16} className={styles.deleteIcon} />
              </button>
            </td>
          </tr>

          {viewCodeBars[produto.id] && (
            <tr key={`${produto.id}-barcode`}>
              <td colSpan={10} style={{ textAlign: "center" }}>
                <svg
                  ref={(el: any) => (barcodeRefs.current[index] = el)}
                  style={{ display: "inline-block", margin: "10px 0" }}
                ></svg>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );
};
