"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./addFornecedorEdit.module.css";
import { AddSuplierService } from "@/app/services/AddSuppliers";
import { EditFornecedortRoutePost } from "@/app/services/EditFornecedor";
import { formatarTelefone } from "@/app/utils/FormatNumberPhone";
import { FormatarValor } from "@/app/utils/FormatValue";
import { Mask } from "@/app/utils/formatValor";
import { ViaCep } from "@/app/services/ViaCepService";

interface AddSupplierFormProps {
  getFornecedores: () => void;
  fornecedores: any[];
  open: boolean;
  close: (value: boolean) => void;
}

export default function AddFornecedorFormEdit({
  open,
  close,
  fornecedores,
  getFornecedores,
}: AddSupplierFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [nomeFornecedor, setNomeFornecedor] = useState(
    fornecedores[0].nomeFornecedor
  );

  const [cepFornecedor, setCepFornecedor] = useState(
    fornecedores[0].cepFornecedor
  );
  const [telefoneFornecedor, setTelefoneFornecedor] = useState(
    fornecedores[0].telefoneFornecedor
  );
  const [enderecoFornecedor, setEnderecoFornecedor] = useState(
    fornecedores[0].enderecoFornecedor
  );
  const [freteFornecedor, setFreteFornecedor] = useState<string>(
    fornecedores[0].freteFornecedor
  );
  const [produtoFornecedor, setProdutoFornecedor] = useState(
    fornecedores[0].produtoFornecedor
  );

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [open]);

  useEffect(() => {
    setEnderecoFornecedor(fornecedores[0].enderecoFornecedor);
    setNomeFornecedor(fornecedores[0].nomeFornecedor);
    setProdutoFornecedor(fornecedores[0].produtoFornecedor);
    setCepFornecedor(fornecedores[0].cepFornecedor);
    setTelefoneFornecedor(fornecedores[0].telefoneFornecedor);
  }, [fornecedores]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoFornecedor: any = {
      nomeFornecedor,
      telefoneFornecedor,
      enderecoFornecedor,
      produtoFornecedor,
      cepFornecedor,
    };

    await EditFornecedortRoutePost(
      fornecedores[0].idFornecedor,
      novoFornecedor
    );
    getFornecedores();
    dialogRef.current?.close();
    close(false);
  };

  const GetEndereco = async () => {
    if (cepFornecedor.length == 8) {
      const response = await ViaCep(cepFornecedor.trim());
      if (!response.data.erro) {
        let enderecoString = `${response.data.localidade}, ${response.data.bairro}, ${response.data.logradouro}, ${response.data.complemento} ${enderecoFornecedor}`;
        setEnderecoFornecedor(enderecoString);
      } else {
        window.alert("Cep inválido");
      }
    } else {
      setEnderecoFornecedor("");
    }
  };

  useEffect(() => {
    GetEndereco();
  }, [cepFornecedor]);

  if (!open) return null;

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Adicionar novo fornecedor</h1>
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
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Nome do fornecedor"
                value={nomeFornecedor}
                onChange={(e) => setNomeFornecedor(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="telefone">Telefone (Whatsapp)</label>
              <input
                type="text"
                id="telefone"
                placeholder="+55 00 00000-0000"
                value={formatarTelefone(telefoneFornecedor)}
                onChange={(e) =>
                  setTelefoneFornecedor(formatarTelefone(e.target.value))
                }
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="cep">Cep</label>
              <input
                type="text"
                id="cep"
                placeholder="00000-000"
                value={cepFornecedor}
                onChange={(e) => setCepFornecedor(e.target.value)}
                min={0}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                id="endereco"
                placeholder="Endereço completo"
                value={enderecoFornecedor}
                onChange={(e) => setEnderecoFornecedor(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="produto">Produto fornecido</label>
              <input
                type="text"
                id="produto"
                placeholder="Ex: Tênis, Camisetas, Tecidos"
                value={produtoFornecedor}
                onChange={(e) => setProdutoFornecedor(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Adicionar Fornecedor
          </button>
        </form>
      </div>
    </dialog>
  );
}
