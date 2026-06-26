import { useEffect } from "react";
import styles from "./ComponenteRevisao.module.css";
import { VendaProps } from "../AddNewVenda/ComponenteProduct";
import { Client } from "../Context/ProdutoContext";

interface RevisaoVendaContentProps {
  HandleVenda: (venda: VendaProps, cliente: Client) => void;
  venda: VendaProps[];
  cliente: Client | undefined | any;
}

export default function RevisaoVendaContent({
  venda,
  cliente,
  HandleVenda,
}: RevisaoVendaContentProps) {
  const vendaAtual = venda[0];

  useEffect(() => {
    if (vendaAtual && cliente) {
      HandleVenda(vendaAtual, cliente);
    }
  }, [vendaAtual, cliente, HandleVenda]);

  if (!vendaAtual || !cliente) {
    return <p className={styles.alerta}>Dados da venda incompletos.</p>;
  }

  const produtos = vendaAtual.products || [];

  return (
    <div className={styles.container}>
      <h3 className={styles.subtitulo}>Revisão</h3>

      <div className={styles.bloco}>
        <span className={styles.label}>Cliente: {cliente[0].nomeCliente}</span>
      </div>

      <div className={styles.bloco}>
        <span className={styles.label}>Produtos</span>
        <div className={`${styles.bloco} ${styles.tabeladiv}`}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Venda</th>
                <th>Preço Custo</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.product.nomeProduto}</td>
                  <td>{item.quantidadeP}</td>
                  <td>
                    {Number(item.product.precoVenda / 100).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    ) ?? 0}
                  </td>
                  <td>
                    {Number(item.product.preco / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? 0}
                  </td>

                  <td>{item.product.categoria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.blocof}>
        <div className={styles.metodf}>
          <span className={styles.label}>Método de pagamento</span>
          <span className={styles.valor}>
            {vendaAtual.metodoPagamento || "Pagamento não definido"}
          </span>
        </div>
        <div className={styles.totalf}>
          <span className={styles.label}>Total</span>
          <span className={styles.valor}>
            {Number(vendaAtual.total / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }) ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
