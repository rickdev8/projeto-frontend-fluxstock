import { GetAllClient } from "@/app/services/GetAllClients";
import { GetAllProducts } from "@/app/services/GetAllProducts";
import { GetAllFornecedores } from "@/app/services/GetFornecedores";
import { TodosClientes } from "@/app/services/TodosClientes";

export interface Product {
  id: string;
  nomeProduto: string;
  preco: number;
  precoVenda: number;
  imgUrl: string;
  quantidade: number;
  categoria: string;
  cor: string;
  marca: string;
  tamanho: string;
  descricao: string;
  barCode: string;
}

export interface SupplierDTO {
  nomeFornecedor: string;
  enderecoFornecedor: string;
  telefoneFornecedor: string;
  produtoFornecedor: string;
  cepFornecedor: string;
}

export interface SupplierDTOReturn {
  idFornecedor: string;
  nomeFornecedor: string;
  enderecoFornecedor: string;
  telefoneFornecedor: string;
  produtoFornecedor: string;
  cepFornecedor: string;
}

export interface Client {
  id: string;
  nomeCliente: string;
  enderecoCliente: string;
  telefoneCliente: string;
  perfilCliente: string;
  cepCliente: string;
  status: string;
}

export interface PropsPageClient {
  page: number;
  limit: number;
  busca: string;
  filtro: string;
}

export interface PropsPageFornecedor {
  page: number;
  limit: number;
  search: string;
}

export const carregarClientes = async ({
  page,
  limit,
  busca,
  filtro,
}: PropsPageClient): Promise<Client[]> => {
  const response = await GetAllClient<Client[]>(page, limit, busca, filtro);
  return response.data;
};

export const carregarFornecedores = async ({
  page,
  limit,
  search,
}: PropsPageFornecedor): Promise<SupplierDTO[]> => {
  console.log(search);
  const response = await GetAllFornecedores<SupplierDTO[]>(page, limit, search);
  return response.data;
};

export const CarregarClientes = async (search: string): Promise<any[]> => {
  const response = await TodosClientes<any[]>(search);
  return response.data;
};
