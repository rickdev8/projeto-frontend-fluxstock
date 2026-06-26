"use client";

import styles from "./Cliente.module.css";
import cardStyles from "./Card.module.css";
import tableStyles from "./tableStyles.module.css";

import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

import AddClientForm from "@/app/components/AddClient/NewAddClient";
import { useEffect, useState } from "react";
import { TableClient } from "@/app/components/tableClient/TableClient";
import {
  carregarClientes,
  Client,
  PropsPageClient,
} from "@/app/components/Context/ProdutoContext";
import { FindClientById } from "@/app/services/FindClientById";
import EditClientForm from "@/app/components/EditClient/EditClient";
import { DeleteClient } from "@/app/services/DeleteClient";
import { Confirm } from "@/app/components/ComponentConfirm/Confirm";

export default function EmployeePage() {
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [clientes, setClientes] = useState<Client[]>([]);
  const [busca, setBusca] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [dadosForm, setDadosForm] = useState<Client>();
  const [stateForm, setStateForm] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalCliente, setTotalCliente] = useState(0);
  const [filtro, setFiltro] = useState("Filtrar");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState<string>("");

  const handleEdit = async (id: string) => {
    try {
      setLoading(true);
      const response: any = await FindClientById(id);
      if (response?.data) {
        setDadosForm(response.data);
        setStateForm(true);
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await DeleteClient(id);
      if (response) {
        await loadClientes();
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadClientes = async () => {
    try {
      setLoading(true);
      const dados: PropsPageClient = { page, limit, busca, filtro };
      const client: any = await carregarClientes(dados);
      if (client?.clientes) {
        setTotalCliente(client.total);
        setClientes(client.clientes);
        setTotalPages(client.totalPages);
        setPage(client.page);
      }
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      loadClientes();
    }, 800);

    return () => clearTimeout(debounce);
  }, [busca, filtro, page]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clientes</h1>
      <div className={cardStyles.cards}>
        {" "}
        <div className={cardStyles.cardActive}>
          {" "}
          <h2>Clientes</h2>{" "}
          <p className={cardStyles.number}>Total: {totalCliente}</p>{" "}
        </div>{" "}
        <div className={cardStyles.card}></div>{" "}
        <div className={cardStyles.card}></div>{" "}
      </div>

      <h2 className={styles.subtitle}>Pesquisar usuários</h2>

      <div className={tableStyles.controls}>
        <div className={tableStyles.search}>
          <FiSearch />
          <input
            maxLength={20}
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Nome do usuário"
          />
        </div>

        <button
          onClick={() => setAddClientOpen(true)}
          className={tableStyles.add}
        >
          <AiOutlinePlus /> Novo cliente
        </button>
        <select
          onChange={(e) => setFiltro(e.target.value)}
          className={tableStyles.select}
          value={filtro}
        >
          <option value="Filtrar">Filtrar</option>
          <option value="Pendentes">Pendente</option>
          <option value="Pagos">Pago</option>
        </select>
      </div>

      <TableClient
        HandleDelete={(id: string) => {
          setIdDelete(id);
          setOpenConfirm(true);
        }}
        HandleEdit={handleEdit}
        loading={loading}
        clientes={clientes}
      />
      <AddClientForm
        open={addClientOpen}
        close={() => setAddClientOpen(false)}
        onAddClient={loadClientes}
      />

      {stateForm && (
        <EditClientForm
          Reload={(e: boolean) => setLoading(e)}
          carregarClienteEditado={loadClientes}
          close={() => setStateForm(false)}
          open={stateForm}
          onEditClient={dadosForm}
        />
      )}

      {openConfirm && (
        <Confirm
          mensagem="Deseja realmente excluir este cliente?"
          onCancel={() => setOpenConfirm(false)}
          onConfirm={() => {
            handleDelete(idDelete);
            setOpenConfirm(false);
          }}
        />
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
  );
}
