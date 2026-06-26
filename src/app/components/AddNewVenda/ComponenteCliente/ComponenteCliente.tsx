"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ComponenteCliente.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { CarregarClientes } from "../../Context/ProdutoContext";
import { Select } from "../../componentSelect/Selected";

export interface Cliente {
  id: string;
  nomeCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
  perfilCliente: string;
  statusCliente: string;
}

interface ClientProps {
  ButtonProximo: (value: boolean) => void;
  ButtonDisabled: (value: boolean) => void;
  open: boolean;
  onClose?: () => void;
  ClienteSelecionado: (cliente: Cliente) => void;
  ClienteS?: Cliente[]; 
}

export default function ComponenteCliente({
  ButtonProximo,
  ButtonDisabled,
  open,
  onClose,
  ClienteSelecionado,
  ClienteS = [],
}: ClientProps) {
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultados, setResultados] = useState<Cliente[]>([]);
  const [selecionado, setSelecionado] = useState<Cliente | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

 
  const lista = useMemo<Cliente[]>(() => {
    const fonte = busca.trim() === "" ? ClienteS : resultados;
    const termo = busca.trim().toLowerCase();

    return termo === ""
      ? fonte
      : fonte.filter((c) =>
          c.nomeCliente.toLowerCase().includes(termo)
        );
  }, [busca, ClienteS, resultados]);

  useEffect(() => {
    const habilitado = !!selecionado;
    ButtonProximo(habilitado);
    ButtonDisabled(!habilitado);
  }, [selecionado, ButtonProximo, ButtonDisabled]);



  useEffect(() => {
    if (
      selecionado &&
      busca.trim().toLowerCase() !== selecionado.nomeCliente.trim().toLowerCase()
    ) {
      setSelecionado(null);
    }
  }, [busca, selecionado]);

  useEffect(() => {
    if (!open) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const termo = busca.trim();
    if (termo === "") {
      setResultados([]);
      setLoading(false);
      setErro(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setErro(null);

      const currentId = ++requestIdRef.current;
      try {
        const resp: any = await CarregarClientes(termo);
        const lista: Cliente[] = Array.isArray(resp)
          ? resp
          : (resp?.data ?? []);

        if (currentId === requestIdRef.current) {
          setResultados(lista);
        }
      } catch (e) {
        if (currentId === requestIdRef.current) {
          setErro("Erro ao carregar clientes.");
          setResultados([]);
        }
      } finally {
        if (currentId === requestIdRef.current) {
          setLoading(false);
        }
      }
    }, 600); 

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [busca, open]);

  const handleSelecionar = (cliente: Cliente) => {
    setSelecionado(cliente);
    setBusca(cliente.nomeCliente); 
    ClienteSelecionado(cliente);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Selecionar cliente</h2>
        {onClose && (
          <button className={styles.btnFechar} onClick={onClose} aria-label="Fechar">
            <FiX size={20} />
          </button>
        )}
      </div>

      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input
          maxLength={100}
          type="text"
          placeholder="Buscar cliente..."
          value={selecionado?.nomeCliente? selecionado.nomeCliente : busca}
          onChange={(e) => setBusca(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {erro && <p className={styles.naoEncontrado}>{erro}</p>}
      {!erro && loading && <p className={styles.naoEncontrado}>Carregando...</p>}

      {!erro && !loading && lista.length === 0 && (
        <p className={styles.naoEncontrado}>
          {busca.trim() === ""
            ? "Digite para buscar ou selecione da lista sugerida."
            : "Nenhum cliente encontrado."}
        </p>
      )}

      {!erro && !loading && lista.length > 0 && (
        <div className={styles.list}>
          {lista.map((cliente) => {
            const ativo = selecionado?.id === cliente.id;
            return (
              <div
                key={cliente.id}
                onClick={() => handleSelecionar(cliente)}
                className={styles.item}
                aria-selected={ativo}
              >
                <div className={styles.info}>
                  <img
                    src={cliente.perfilCliente || "/default-user.png"}
                    alt={cliente.nomeCliente}
                    className={styles.foto}
                  />
                  <div className={styles.details}>
                    <strong>{cliente.nomeCliente}</strong>
                    <span>{cliente.enderecoCliente}</span>
                    <span>{cliente.telefoneCliente}</span>
                  </div>
                </div>
                <Select actived={ativo} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
