import tableStyles from "./Tabela.module.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Client } from "../Context/ProdutoContext";

import imageSemFoto from "../../../../public/user.avif";
import { formatarTelefone } from "@/app/utils/FormatNumberPhone";
import { LoadingTables } from "../loading/LoadingTable";

interface ResultClient {
  clientes: Client[];
  HandleEdit: (id: string) => void;
  HandleDelete: (id: string) => void;
  loading: boolean;
}

export const TableClient = ({
  clientes,
  HandleEdit,
  HandleDelete,
  loading,
}: ResultClient) => {
 
  return (
    <>
      <div className={tableStyles.tableWrapper}>
        {!loading ? (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Localização</th>
                <th>Telefone</th>
                <th>Cep</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => {
                return (
                  <tr key={index}>
                    <td className={tableStyles.clientPerfil}>
                      <img
                        className={tableStyles.avatar}
                        src={
                          cliente.perfilCliente
                            ? cliente.perfilCliente
                            : imageSemFoto.src
                        }
                        alt={cliente.perfilCliente}
                      />
                      {cliente.nomeCliente}
                    </td>
                    <td>{cliente.status}</td>
                    <td className={tableStyles.endereco}>{cliente.enderecoCliente}</td>
                    <td>
                      {cliente.telefoneCliente != "Sem telefone"
                        ? formatarTelefone(cliente.telefoneCliente)
                        : cliente.telefoneCliente}
                    </td>
                    <td>{cliente.cepCliente}</td>
                    <td className={tableStyles.actions}>
                      <button onClick={() => HandleEdit(cliente.id)}>
                        <FiEdit2 className={tableStyles.editIcon} size={22} />
                      </button>
                      <button onClick={() => HandleDelete(cliente.id)}>
                        <FiTrash2
                          className={tableStyles.deleteIcon}
                          size={22}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <LoadingTables />
        )}
      </div>
    </>
  );
};
