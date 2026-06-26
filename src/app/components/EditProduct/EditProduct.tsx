"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Editproduct.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { EditProductRoutePost } from "@/app/services/EditProductPost";
import { FormatarValor } from "@/app/utils/FormatValue";
import { Mask } from "@/app/utils/formatValor";

interface AddProductFormProps {
  closeEditProduct: () => void;
  onEditProduct: any;
  recarregarProducts: () => void;
  openEdit: boolean;
  Reload: (e: boolean) => void;
}

export default function EditProductForm({
  closeEditProduct,
  onEditProduct,
  openEdit,
  recarregarProducts,
  Reload,
}: AddProductFormProps) {
  const dialogRRef = useRef<HTMLDialogElement | null>(null);

  const [nomeProduto, setNomeProduto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (openEdit && dialogRRef.current) {
      dialogRRef.current.showModal();
      setNomeProduto(onEditProduct.data[0].nomeProduto);
      setCategoria(onEditProduct.data[0].categoria);
      setQuantidade(String(onEditProduct.data[0].quantidade));
      setPrecoVenda(String(onEditProduct.data[0].precoVenda));
      setPrecoCusto(String(onEditProduct.data[0].preco));
      setDescricao(onEditProduct.data[0].descricao);
    }
  }, [openEdit]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    Reload(true);

    if (Number(quantidade) <= 0) {
      alert("A quantidade deve ser maior que zero.");
      Reload(false);
      return;
    }

    if (FormatarValor(precoVenda) <= 0 || FormatarValor(precoCusto) <= 0) {
      alert("Os preços devem ser maiores que zero.");
      Reload(false);
      return;
    }

    const formData = new FormData();
    formData.append("nomeProduto", nomeProduto);
    formData.append("categoria", categoria);
    formData.append("quantidade", quantidade);
    formData.append("precoVenda", FormatarValor(precoVenda).toString());
    formData.append("precoCusto", FormatarValor(precoCusto).toString());
    formData.append("descricao", descricao);

    const response = await EditProductRoutePost(
      onEditProduct.data[0].id,
      formData
    );
    if (response) {
      Reload(false);
    }

    recarregarProducts();
    closeEditProduct();
    dialogRRef.current?.close();
  }

  return (
    <dialog ref={dialogRRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Editar Produto</h2>
          <button
            onClick={() => {
              dialogRRef.current?.close();
              closeEditProduct();
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
                maxLength={254}
                required
                type="text"
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
                <option value="Listradas">Listradas</option>
                <option value="Calcas">Calças</option>
                <option value="Perfumes">Perfumes</option>
                <option value="Utensilhos">Utensilhos</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Quantidade</label>
              <input
                required
                type="number"
                min={1}
                value={quantidade}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuantidade(val < 1 ? "1" : String(val));
                }}
                placeholder="Ex: 100"
              />
            </div>

            <div className={styles.field}>
              <label>Preço de Venda</label>
              <input
                required
                type="text"
                value={Mask(precoVenda)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  if (Number(raw) < 0) return;
                  setPrecoVenda(e.target.value);
                }}
                placeholder="Ex: R$ 100"
              />
            </div>

            <div className={styles.field}>
              <label>Preço de Custo</label>
              <input
                required
                type="text"
                value={Mask(precoCusto)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  if (Number(raw) < 0) return;
                  setPrecoCusto(e.target.value);
                }}
                placeholder="Ex: R$ 80"
              />
            </div>

            <div className={styles.fieldFull}>
              <label>Descrição do Produto</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite algo sobre o produto aqui"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Editar Produto
          </button>
        </form>
      </div>
    </dialog>
  );
}
