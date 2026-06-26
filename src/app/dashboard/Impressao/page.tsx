"use client";

import { useEffect, useState } from "react";
import styles from "./print.module.css";
import { GetAllProducts } from "@/app/services/GetAllProducts";
import ProdutosPrintPage from "@/app/components/BarCode/RelatorioProdutos";
import { LoadingTables } from "@/app/components/loading/LoadingTable";

interface Produto {
  id: string;
  nomeProduto: string;
  quantidade: number;
}

export default function PrintSalesPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchProdutos(page: number, limit: number, busca: string) {
    try {
      const res: any = await GetAllProducts(page, limit, "", busca);
      const data = res?.data.data;
      if (res.data.data) {
        setTotalPages(res.data.totalPages);
        setProdutos(data);
        setLoading(false)
      } else {
        setProdutos([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const time = setTimeout(() => {
      fetchProdutos(page, limit, search);
    }, 750);

    return () => clearTimeout(time);
  }, [page, search]);

  return (
    <div className={styles.container}>
      <h1>Codigo de barra dos produtos e impressão</h1>
      <div className={styles.search}>
        <label className={styles.label}>Pesquisar produtos</label>
        <input
          value={search}
          type="text"
          placeholder="Digite o nome do produto..."
          className={styles.input2}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? <LoadingTables /> : <ProdutosPrintPage produtos={produtos} />}

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
    </div>
  );
}
