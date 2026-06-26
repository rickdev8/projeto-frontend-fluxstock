"use client";

import styles from "./Fornecedores.module.css";
import cardStyles from "./Card.module.css";
import tableStyles from "./tableStyles.module.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  carregarFornecedores,
  SupplierDTO,
  SupplierDTOReturn,
} from "@/app/components/Context/ProdutoContext";
import AddSupplierForm from "@/app/components/AddFornecedoresForm";
import { TableSupplier } from "@/app/components/TableFornecedores";
import { GetFornecedorBtId } from "@/app/services/FindFornecedorById";
import AddFornecedorFormEdit from "@/app/components/AddFornecedorFormEdit";
import { DeleteFornecedor } from "@/app/services/DeleteFornecedor";
import { Confirm } from "@/app/components/ComponentConfirm/Confirm"; 

export default function FornecedorPage() {
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [addSupplierOpenEdit, setAddSupplierOpenEdit] = useState(false);
  const [fornecedores, setFornecedores] = useState<SupplierDTOReturn[]>([]);
  const [dadosFornecedor, setDadosFornecedor] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPage, setTotalPage] = useState(1);
  const [totalFornecedores, setTotalFornecedores] = useState(0);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const GetFornecedores = async () => {
    setLoading(true);
    const dados: any = { page, limit, search };
    const fornecedores: any = await carregarFornecedores(dados);
    if (fornecedores) {
      setTotalFornecedores(fornecedores.total);
      setFornecedores(fornecedores.fornecedores);
      setPage(fornecedores.page);
      setTotalPage(fornecedores.totalPages);
    }
    setLoading(false);
  };

  const editfornecedor = async (id: string) => {
    const response: any = await GetFornecedorBtId(id);
    setAddSupplierOpenEdit(true);
    setDadosFornecedor(response.data);
    GetFornecedores();
  };

  const deletefornecedor = async (id: string) => {
    await DeleteFornecedor(id);
    GetFornecedores();
  };

  useEffect(() => {
    setLoading(true);
    const FornecedoresFiltrados = setTimeout(() => {
      GetFornecedores();
    }, 700);

    return () => clearTimeout(FornecedoresFiltrados);
  }, [search, page]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fornecedores</h1>

      <div className={cardStyles.cards}>
        <div className={cardStyles.cardActive}>
          <h2>Fornecedores</h2>
          <p className={cardStyles.number}>Total: {totalFornecedores}</p>
        </div>
        <div className={cardStyles.card}></div>
        <div className={cardStyles.card}></div>
      </div>

      <h2 className={styles.subtitle}>Pesquisar fornecedores</h2>

      <div className={tableStyles.controls}>
        <div className={tableStyles.search}>
          <FiSearch />
          <input
            maxLength={20}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Nome do fornecedor"
          />
        </div>

        <button
          onClick={() => setAddSupplierOpen(true)}
          className={tableStyles.add}
        >
          <AiOutlinePlus /> Novo fornecedor
        </button>
      </div>

      {dadosFornecedor && (
        <AddFornecedorFormEdit
          getFornecedores={GetFornecedores}
          fornecedores={dadosFornecedor}
          open={addSupplierOpenEdit}
          close={() => setAddSupplierOpenEdit(false)}
        />
      )}

      <TableSupplier
        editfornecedor={editfornecedor}
        deletefornecedor={(id: string) => {
          setIdDelete(id);
          setOpenConfirm(true);
        }}
        fornecedores={fornecedores}
        loading={loading}
      />

      <AddSupplierForm
        getFornecedores={GetFornecedores}
        open={addSupplierOpen}
        close={() => setAddSupplierOpen(false)}
      />

      {openConfirm && (
        <Confirm
          mensagem="Deseja realmente excluir este fornecedor?"
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => {
            deletefornecedor(idDelete);
            setOpenConfirm(false);
          }}
        />
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>

        <span className={styles.paginationInfo}>
          Página {page} de {totalPage}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
          disabled={page === totalPage}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
