import { FiEdit2, FiTrash2 } from "react-icons/fi";
import tableStyles from "./TableFornecedores.module.css";

import { SupplierDTO, SupplierDTOReturn } from "../Context/ProdutoContext";
import { formatarTelefone } from "@/app/utils/FormatNumberPhone";
import { LoadingTables } from "../loading/LoadingTable";

interface ResultSupplier {
  editfornecedor: (id: string) => void;
  deletefornecedor: (id: string) => void;
  fornecedores: SupplierDTOReturn[];
  busca?: string;
  loading: boolean;
}

export const TableSupplier = ({
  fornecedores,
  editfornecedor,
  deletefornecedor,
  busca = "",
  loading,
}: ResultSupplier) => {
  const fornecedoresFiltrados = fornecedores.filter((f) =>
    f.nomeFornecedor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className={tableStyles.tableWrapper}>
      {!loading ? (
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Localização</th>
              <th>Cep</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedoresFiltrados.map((fornecedor) => (
              <tr key={fornecedor.idFornecedor}>
                <td className={tableStyles.clientPerfil}>
                  {fornecedor.nomeFornecedor}
                </td>
                <td className={tableStyles.tdf}>
                  {fornecedor.enderecoFornecedor}
                </td>
                <td>{fornecedor.cepFornecedor}</td>
                <td>{formatarTelefone(fornecedor.telefoneFornecedor)}</td>
                <td className={tableStyles.actions}>
                  <button
                    onClick={() => editfornecedor(fornecedor.idFornecedor)}
                  >
                    <FiEdit2 className={tableStyles.editIcon} size={22} />
                  </button>
                  <button
                    onClick={() => deletefornecedor(fornecedor.idFornecedor)}
                  >
                    <FiTrash2 className={tableStyles.deleteIcon} size={22} />
                  </button>
                </td>
              </tr>
            ))}

            {fornecedoresFiltrados.length === 0 && (
              <tr>
                <td colSpan={5} className={tableStyles.noData}>
                  Nenhum fornecedor encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <LoadingTables />
      )}
    </div>
  );
};
