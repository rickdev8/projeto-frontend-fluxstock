import axios from "axios";

export async function FilterFornecedorService<T>(busca: string) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/filterFornecedor`,
    {
      params: {
        search: busca,
      },
    }
  );
  return response;
}
