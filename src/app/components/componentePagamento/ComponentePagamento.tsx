import { useEffect, useState } from "react";
import styles from "./ComponentePagamento.module.css";

const MetodoCartao = ({
  metodoCartao,
  setMetodoCartao,
}: {
  metodoCartao: string;
  setMetodoCartao: (v: string) => void;
}) => {
  return (
    <div className={styles.selectGroup}>
      <label className={styles.label}>Cartão método</label>
      <select
        value={metodoCartao}
        onChange={(e) => setMetodoCartao(e.target.value)}
        className={styles.select}
      >
        <option value="Crédito">Crédito</option>
        <option value="Débito">Débito</option>
      </select>
    </div>
  );
};

export interface ValuesPagamento {
  formaPagamento: string;
  statusPagamento: string;
  metodoCartao: string | null;
  desconto: number | undefined
}

export interface HandleValueProps {
  HandleValue: (values: ValuesPagamento) => void;
  metodopagamento: string | undefined;
  statuspagamento: string | undefined;
  
}

const ComponentePagamento = ({
  HandleValue,
  metodopagamento,
  statuspagamento,
}: HandleValueProps) => {
  const [formaPagamento, setFormaPagamento] = useState(
    metodopagamento ? metodopagamento : "Pix"
  );
  const [statusPagamento, setStatusPagamento] = useState(
    statuspagamento ? statuspagamento : "Pago"
  );
  const [metodoCartao, setMetodoCartao] = useState("Crédito");
  const [desconto, setDesconto] = useState(0)

  useEffect(() => {
    HandleValue({
      formaPagamento,
      statusPagamento,
      metodoCartao: formaPagamento === "Cartão" ? metodoCartao : null,
      desconto
    });
  }, [formaPagamento, statusPagamento, metodoCartao, desconto]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Checkout</h2>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Forma de pagamento</label>
        <select
          onChange={(e) => setFormaPagamento(e.target.value)}
          value={formaPagamento}
          className={styles.select}
        >
          <option value="Pix">Pix</option>
          <option value="Cartão">Cartão</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Boleto">Boleto</option>
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label className={styles.label}>Status do pagamento</label>
        <select
          onChange={(e) => setStatusPagamento(e.target.value)}
          value={statusPagamento}
          className={styles.select}
        >
          <option value="Pago">Pago</option>
          <option value="Pendente">Pendente</option>
        </select>
      </div>
      <div className={styles.selectGroup}>
        <label className={styles.label}>Desconto em porcentagem</label>
        <input
          type="number"
          value={desconto}
          onChange={(e) => setDesconto(Number(e.target.value))}
          className={styles.input}
          min={0}
          placeholder="Ex: 10%"
          max={100}
        /> 
      </div>
    </div>
  );
};

export default ComponentePagamento;
