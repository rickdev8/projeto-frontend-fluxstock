"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./editVenda.module.css";
import { EditVendas } from "@/app/services/EditVendas";
import { Mask } from "@/app/utils/formatValor";
import { FormatarValor } from "@/app/utils/FormatValue";

interface AddNewVendaProps {
  open: boolean;
  close: (v: boolean) => void;
  dadosVenda: any;
  refreshVendas: () => void;
}

export default function EditVendaForm({
  open,
  close,
  dadosVenda,
  refreshVendas,
}: AddNewVendaProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [total, setTotal] = useState(dadosVenda?.dadosVenda.total ?? "");
  const [totalPago, setTotalPago] = useState(
    dadosVenda?.dadosVenda.valorParcial ?? ""
  );
  const [statusPagamento, setStatusPagamento] = useState(
    dadosVenda?.dadosVenda.statusPagamento ?? "Pendente"
  );
  const [paymentMethod, setPaymentMethod] = useState(
    dadosVenda?.dadosVenda.paymentMethod ?? "Pix"
  );

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  useEffect(() => {
    setTotal(dadosVenda?.dadosVenda.total ?? "");
    setTotalPago(dadosVenda?.dadosVenda.valorParcial ?? "");
    setStatusPagamento(dadosVenda?.dadosVenda.statusPagamento ?? "Pendente");
    setPaymentMethod(dadosVenda?.dadosVenda.paymentMethod ?? "Pix");
  }, [dadosVenda]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const SaleEdit = {
      clientId: dadosVenda.dadosVenda.clientId,
      paymentMethod: paymentMethod,
      statusPagamento: statusPagamento,
      total: FormatarValor(total).toString(),
      valorParcial: FormatarValor(totalPago).toString(),
    };

    await EditVendas(dadosVenda.id, SaleEdit);
    refreshVendas();
    dialogRef.current?.close();
    close(false);
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Editar Venda</h1>
          <button
            onClick={() => {
              dialogRef.current?.close();
              close(false);
            }}
            className={styles.bulkUpload}
          >
            Cancelar
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}></div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="payment">Método Pagamento</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="payment"
              >
                <option value="Pix">Pix</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão">Cartão</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="status">Status Pagamento</label>
              <select
                value={statusPagamento}
                onChange={(e) => setStatusPagamento(e.target.value)}
                id="status"
              >
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
                <option value="Parcial">Pagamento parcial</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="valor">Total</label>
              <input
                value={Mask(total)}
                className={styles.inputGroup}
                type="text"
                required
                onChange={(e) => setTotal(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="valor">Total pago</label>
              <input
                value={Mask(totalPago)}
                className={styles.inputGroup}
                type="text"
                required
                onChange={(e) => setTotalPago(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Editar Venda
          </button>
        </form>
      </div>
    </dialog>
  );
}
