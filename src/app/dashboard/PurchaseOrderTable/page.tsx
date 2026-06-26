"use client";

import styles from "./PurchaseOrderTable.module.css";
import { FiSearch, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import AddNewVenda from "@/app/components/AddNewVenda/ComponenteProduct";
import React, { useEffect, useState } from "react";
import { GetAllVendas } from "@/app/services/FindVendas";
import { FindVendaById } from "@/app/services/FindVendaServiceById";
import EditVendaForm from "@/app/components/EditVenda/EditVenda";
import { DeleteVenda } from "@/app/services/DeleteVenda";
import { FilterVendas } from "@/app/services/FilterVendas";
import { LoadingTables } from "@/app/components/loading/LoadingTable";
import { Confirm } from "@/app/components/ComponentConfirm/Confirm";

export default function PurchaseOrderTable() {
  const [open, setOpen] = useState(false);
  const [vendas, setVendas] = useState<any[]>([]);
  const [dadosVenda, setDadosVenda] = useState<any>({});
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(7);
  const [totalPages, setTotalPages] = useState(1);
  const [idSelect, setIdSelect] = useState<string>("");
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    setLoading(true);

    const funcao = setTimeout(() => {
      handleFilter();
    }, 800);
    return () => clearTimeout(funcao);
  }, [busca, selected, page]);

  const IsSaleFinish = () => handleFilter();

  const deleteSale = async (id: string) => {
    try {
      setLoading(true);
      const response = await DeleteVenda(id);
      if (response) await handleFilter();
    } finally {
      setLoading(false);
      setOpenModalConfirm(false);
      setIdSelect("");
    }
  };

  const editSale = async (id: string) => {
    try {
      setLoading(true);
      const DadosVenda: any = await FindVendaById(id);
      if (DadosVenda) {
        setOpenEdit(true);
        setDadosVenda({ dadosVenda: DadosVenda.data, id });
      } else {
        setDadosVenda([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const resultado: any = await FilterVendas(
        selected.trim(),
        busca,
        page,
        limit
      );
      if (resultado) {
        setVendas(resultado.data.data);
        setTotalPages(resultado.data.totalPages);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vendas</h1>

      <div className={styles.controls}>
        <div className={styles.searchFilter}>
          <div className={styles.searchBox}>
            <FiSearch />
            <input
              onChange={(e) => {
                setBusca(e.target.value);
                setPage(1);
              }}
              value={busca}
              maxLength={20}
              type="text"
              placeholder="Nome do cliente"
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={() => setOpen(true)} className={styles.createBtn}>
            <FiPlus /> Nova venda
          </button>
        </div>
      </div>

      <div className={styles.dateFilters}>
        {[
          "Mais recentes",
          "Mais antigos",
          "Maior preco",
          "Menor preco",
          "Ordem Alfabetica",
          "Pago",
          "Pendente",
          "Todos",
        ].map((range) => (
          <button
            key={range}
            className={`${styles.dateBtn} ${
              selected === range ? styles.active : ""
            }`}
            onClick={() => {
              setSelected(range);
              setPage(1);
            }}
          >
            {range}
          </button>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <LoadingTables />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome Cliente</th>
                <th>Método pagamento</th>
                <th>Valor</th>
                <th>Valor pago</th>
                <th>Status pagamento</th>
                <th>Data venda</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda, i) => (
                <tr
                  key={i}
                  onMouseEnter={(e) => {
                    const rect = (
                      e.currentTarget as HTMLTableRowElement
                    ).getBoundingClientRect();
                    setHoverIndex(i);
                    setHoverPosition({
                      top: rect.top,
                      left: rect.left,
                      width: rect.width,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverIndex(null);
                    setHoverPosition(null);
                  }}
                >
                  <td>{venda.nomeCliente || "Sem nome"}</td>
                  <td>{venda.paymentMethod}</td>
                  <td>
                    {Number(venda.total / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                     {Number(venda.valorParcial / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{venda.statusPagamento}</td>
                  <td>
                    {new Date(venda.data).toLocaleDateString()} <br />
                    {new Date(venda.data).toLocaleTimeString()}
                  </td>
                  <td className={styles.actionsCol}>
                    <button onClick={() => editSale(venda.id)}>
                      <FiEdit2 color="#7c3aed" size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setIdSelect(venda.id);
                        setOpenModalConfirm(true);
                      }}
                    >
                      <FiTrash2 color="#ef4444" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {hoverIndex !== null && hoverPosition && (
          <div
            className={styles.escondFloat}
            style={{
              top: hoverPosition.top - 10,
              left: hoverPosition.left + hoverPosition.width / 2,
              transform: "translateX(-50%)",
              position: "fixed",
            }}
          >
            <h3>Produtos vendidos</h3>
            <table className={styles.produtosTable}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Qtd</th>
                  <th>Preço Custo</th>
                  <th>Preço Venda</th>
                </tr>
              </thead>
              <tbody>
                {vendas[hoverIndex]?.produtos?.map(
                  (produto: any, idx: number) => (
                    <tr key={idx}>
                      <td>{produto.nomeProduto}</td>
                      <td>{produto.categoria || "-"}</td>
                      <td>{produto.quantidade}</td>
                      <td>
                        {Number(produto.precoCusto / 100).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </td>
                      <td>
                        {Number(produto.precoVenda / 100).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className={styles.pagination}>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || loading}
          >
            Anterior
          </button>

          <span className={styles.paginationInfo}>
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages || loading}
          >
            Próximo
          </button>
        </div>
      </div>

      <AddNewVenda
        IsSaleFinish={IsSaleFinish}
        close={() => setOpen(false)}
        open={open}
      />

      {openEdit && (
        <EditVendaForm
          refreshVendas={() => handleFilter()}
          dadosVenda={dadosVenda}
          close={() => setOpenEdit(false)}
          open={openEdit}
        />
      )}

      {openModalConfirm && (
        <Confirm
          mensagem="Confirmar exclusão de venda?"
          onConfirm={() => deleteSale(idSelect)}
          onCancel={() => {
            setOpenModalConfirm(false);
            setIdSelect("");
          }}
        />
      )}
    </div>
  );
}
