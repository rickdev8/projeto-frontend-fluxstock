import axios from "axios";

export async function GetRelatorioVendas<T>(
  page: number,
  limit: number,
  query: string
) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/findRelatorioVendas/${page}/${limit}`,
    {
      params: {
        search: query,
      },
    }
  );
  return response;
}
