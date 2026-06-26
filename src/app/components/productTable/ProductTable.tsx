"use client";

import styles from "./productTable.module.css";
import { FiSearch, FiPlus } from "react-icons/fi";
import { Product } from "../Context/ProdutoContext";
import { useEffect, useState } from "react";
import { TableProduct } from "../TableProduct/TableProduct";
import { LoadingTables } from "../loading/LoadingTable";
import { EditProductRoute } from "@/app/services/EditProduct";
import EditProductForm from "../EditProduct/EditProduct";
import { DeleteProduct } from "@/app/services/DeleteProduct";
import { Confirm } from "../ComponentConfirm/Confirm";

interface AddProduct {
  onAddProduct: () => void;
  products: Product[];
  loadingProducts: boolean;
  pagination: (page: number, limit: number) => any;
  carregarProdutos: () => void;
  valueOrder: (e: string) => void;
  valueSearch: (e: string) => void;
  totalPages: number;
  pageAtual: number;
}



export default function ProductTable({
  valueSearch,
  onAddProduct,
  products,
  carregarProdutos,
  pagination,
  valueOrder,
  totalPages,
  pageAtual,
}: AddProduct) {
  const [search, setSearch] = useState("");
  const [valueFilter, setValueFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [onFormEdit, SetonFormEdit] = useState(false);
  const [editProductData, setEditProductData] = useState<any>([]);
  const [time, setTime] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFormConfirm, setOpenFormConfirm] = useState(false);
  const [idProduto, setIdProduto] = useState("");

  const HandleFilter = (filter: string) => {
    valueOrder(filter);
    setValueFilter(filter);
  };

  const HandleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    if (time != null) {
      clearTimeout(time);
    }

    setTime(
      setTimeout(() => {
        valueSearch(search);
      }, 800)
    );
  }, [search]);

  const EditP = async (id: string) => {
    setLoading(true);
    const findProduct = await EditProductRoute(id);
    if (findProduct) {
      SetonFormEdit(true);
      setEditProductData(findProduct);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products) {
      setLoading(false);
      setPage(pageAtual);
    }
  }, [products]);

  const DeletarProduto = async () => {
    if (!idProduto) return;
    await DeleteProduct(idProduto);
    carregarProdutos();
    setOpenFormConfirm(false);
    setIdProduto("");
  };

  useEffect(() => {
    setLoading(true);
    pagination(page, limit);
  }, [page, valueFilter]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>

      <div className={styles.controls}>
        <div className={styles.searchFilter}>
          <div className={styles.searchBox}>
            <FiSearch />
            <input
              maxLength={20}
              value={search}
              onChange={HandleValue}
              type="text"
              placeholder="Pesquisar..."
            />
          </div>
          <select
            onChange={(e) => HandleFilter(e.target.value)}
            value={valueFilter}
            className={styles.filterBtn}
          >
            <option value="">Filtrar</option>
            <option value="MaiorQuantidade">Maior quantidade</option>
            <option value="MenorQuantidade">Menor quantidade</option>
            <option value="MaiorPreco">Maior preço</option>
            <option value="MenorPreco">Menor preço</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button onClick={onAddProduct} className={styles.addBtn}>
            <FiPlus /> Novo Produto
          </button>
        </div>
      </div>
      {loading ? (
        <LoadingTables />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço Custo</th>
              <th>Preço Venda</th>
              <th>Quantidade</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>

          <TableProduct
            DeleteProduct={(e) => {
              setIdProduto(e);
              setOpenFormConfirm(true);
            }}
            EditProduct={(e) => EditP(e)}
            product={products}
          />
        </table>
      )}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span className={styles.paginationInfo}>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Próximo
        </button>
      </div>
      {onFormEdit && (
        <EditProductForm
          Reload={(e: boolean) => setLoading(e)}
          recarregarProducts={() => carregarProdutos()}
          openEdit={onFormEdit}
          onEditProduct={editProductData}
          closeEditProduct={() => SetonFormEdit(false)}
        />
      )}
      {openFormConfirm && (
        <Confirm
          mensagem="Deseja mesmo deletar esse produto?"
          onConfirm={DeletarProduto}
          onCancel={() => {
            setOpenFormConfirm(false);
            setIdProduto("");
          }}
        />
      )}
    </div>
  );
}
