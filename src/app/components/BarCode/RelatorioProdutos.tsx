import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { PrintSection } from "../PrintSection/PrintSection";

export type Props = {
  produtos: any[];
};

export default function ProdutosPrintPage({ produtos }: Props) {
  useEffect(() => {
    produtos.forEach((p) => {
      const svg = document.getElementById(`barcode-${p.barCode}`);
      if (svg) {
        JsBarcode(svg, p.id, {
          format: "CODE128",
          lineColor: "#000",
          width: 1,
          height: 100,
        });
      }
    });
  }, [produtos]);

  return <PrintSection produtos={produtos} />;
}
