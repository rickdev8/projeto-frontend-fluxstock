"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./addClient.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { AddClientService } from "@/app/services/AddNewClient";
import { formatarTelefone } from "@/app/utils/FormatNumberPhone";
import { ViaCep } from "@/app/services/ViaCepService";

interface AddNewVendaProps {
  open: boolean;
  close: (v: boolean) => void;
  onAddClient: () => Promise<void>;
}

export default function AddClientForm({
  open,
  close,
  onAddClient,
}: AddNewVendaProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nome.trim().length < 3) {
      alert("O nome deve ter pelo menos 3 caracteres.");
      return;
    }

    const formData = new FormData();
    formData.append("nomeCliente", nome);
    formData.append("enderecoCliente", endereco);
    formData.append("telefoneCliente", telefone);
    formData.append("cepCliente", cep);

  

    try {
      await AddClientService(formData);
      await onAddClient();

      dialogRef.current?.close();
      close(false);
    } catch (error) {
      alert("Erro ao adicionar cliente. Tente novamente.");
    }
  };

  const GetEndereco = async () => {
    if (cep.length == 8) {
      const response = await ViaCep(cep.trim());
      if (!response.data.erro) {
        let enderecoString = `${response.data.localidade}, ${response.data.bairro}, ${response.data.logradouro}, ${response.data.complemento} ${endereco}`;
        setEndereco(enderecoString);
      } else {
        window.alert("Cep inválido");
      }
    } else {
      setEndereco("");
    }
  };

  useEffect(() => {
    GetEndereco();
  }, [cep]);

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
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Telefone (Whatsapp)</label>
              <input
                value={telefone}
                onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                type="text"
                id="phone"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="cep">Cep</label>
              <input
                minLength={8}
                maxLength={8}
                onChange={(e) => setCep(e.target.value)}
                value={cep}
                type="text"
                id="cep"
                placeholder="00000-000"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="address">Endereço</label>
              <input
                required
                minLength={5}
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
