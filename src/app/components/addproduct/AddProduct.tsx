"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./addproduct.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { AddProductService } from "@/app/services/AddPrudtctService";
import { FormatarValor } from "@/app/utils/FormatValue";
import { Mask } from "@/app/utils/formatValor";

interface AddProductFormProps {
  closeAddProduct: () => void;
  onAddProduct: () => Promise<void>;
  open: boolean;
}

export default function AddProductForm({
  closeAddProduct,
  onAddProduct,
  open,
}: AddProductFormProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [nomeProduto, setNomeProduto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nomeProduto", nomeProduto);
    formData.append("categoria", categoria);
    formData.append("quantidade", quantidade);
    formData.append("precoVenda", FormatarValor(precoVenda).toString());
    formData.append("precoCusto", FormatarValor(precoCusto).toString());
    formData.append("descricao", descricao);
    await AddProductService(formData);
    await onAddProduct();
    dialogRef.current?.close();
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Adicionar novo produto</h2>
          <button
            onClick={() => {
              dialogRef.current?.close();
              closeAddProduct();
            }}
          >
            X
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nome do Produto</label>
              <input
                required
                type="text"
                maxLength={50}
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                placeholder="Ex: BoomHigh"
              />
            </div>

            <div className={styles.field}>
              <label>Categoria</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione a categoria</option>
                <option value="Camisas">Camisas</option>
                <option value="Shorts">Shorts</option>
                <option value="Calçados">Calçados</option>
                <option value="Bones">Bonés</option>
                <option value="Blusas">Blusas</option>
                <option value="Time">Camisas de Time</option>
                <option value="Calcas">Calças</option>
                <option value="Acessorios">Acessórios</option>
                <option value="Perfumes">Perfumes</option>
                <option value="Meias">Meias</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Quantidade</label>
              <div className={styles.field}>
                <div className={styles.field}>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={quantidade}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setQuantidade(val);
                      }
                    }}
                    placeholder="Ex: 100"
                  />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label>Preço de Venda</label>
              <input
                required
                type="text"
                maxLength={15}
                value={Mask(precoVenda)}
                onChange={(e) => setPrecoVenda(e.target.value)}
                placeholder="Ex: R$ 100"
              />
            </div>

            <div className={styles.field}>
              <label>Preço de Custo</label>
              <input
                required
                type="text"
                maxLength={15}
                value={Mask(precoCusto)}
                onChange={(e) => setPrecoCusto(e.target.value)}
                placeholder="Ex: R$ 80"
              />
            </div>

            <div className={styles.fieldFull}>
              <label>Descrição do Produto</label>
              <textarea
                maxLength={300}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite algo sobre o produto aqui"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Adicionar Produto
          </button>
        </form>
      </div>
    </dialog>
  );
}
