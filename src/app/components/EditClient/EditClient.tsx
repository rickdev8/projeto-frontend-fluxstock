"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./EditClient.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { Client } from "../Context/ProdutoContext";
import { EditClientRoutePost } from "@/app/services/EditClient";
import { formatarTelefone } from "@/app/utils/FormatNumberPhone";
import { ViaCep } from "@/app/services/ViaCepService";

interface AddNewVendaProps {
  open: boolean;
  close: (v: boolean) => void;
  onEditClient: Client | any;
  carregarClienteEditado: () => void;
  Reload: (e: boolean) => void;
}

export default function EditClientForm({
  open,
  close,
  onEditClient,
  carregarClienteEditado,
  Reload,
}: AddNewVendaProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [nome, setNome] = useState(onEditClient[0].nomeCliente);
  const [telefone, setTelefone] = useState(onEditClient[0].telefoneCliente);
  const [cep, setCep] = useState(onEditClient[0].cepCliente);
  const [endereco, setEndereco] = useState(onEditClient[0].enderecoCliente);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  const GetEndereco = async () => {
    if (cep.length == 8) {
      const response = await ViaCep(cep);
      let enderecoString = `${response.data.localidade}, ${endereco}`;
      setEndereco(enderecoString);
    } else {
      setEndereco("");
    }
  };

  useEffect(() => {
    GetEndereco();
  }, [cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    Reload(true);
    e.preventDefault();

    // Validação do CEP
    if (!/^\d{8}$/.test(cep)) {
      alert("O CEP deve conter exatamente 8 números");
      Reload(false);
      return;
    }

    // Validação do telefone (mínimo 10 números)
    const telefoneNumeros = telefone.replace(/\D/g, "");
    if (telefoneNumeros.length < 10) {
      alert("Telefone inválido, digite pelo menos 10 números");
      Reload(false);
      return;
    }

    const formData = new FormData();
    formData.append("nomeCliente", nome);
    formData.append("enderecoCliente", endereco);
    formData.append("telefoneCliente", telefoneNumeros);
    formData.append("cepCliente", cep.toString());

    const response = await EditClientRoutePost(onEditClient[0].id, formData);
    if (response) {
      carregarClienteEditado();
      dialogRef.current?.close();
      close(false);
      Reload(false);
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Adicionar novo usuário</h1>
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
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nome</label>
              <input
                maxLength={100}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                type="text"
                id="name"
                placeholder="Digite seu nome"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Telefone (Whatsapp)</label>
              <input
                value={formatarTelefone(telefone)}
                onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))}
                type="text"
                id="phone"
                placeholder="Digite seu telefone"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="cep">Cep</label>
              <input
                minLength={8}
                maxLength={8}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                value={cep}
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CEP"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="address">Endereço</label>
              <input
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                type="text"
                id="address"
                placeholder="Digite seu endereço"
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Adicionar
          </button>
        </form>
      </div>
    </dialog>
  );
}
