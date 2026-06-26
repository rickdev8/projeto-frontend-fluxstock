import axios from "axios";

export async function GetAllVendas<T>(
  page: number,
  limit: number,
  query: string
) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/findVendas/${page}/${limit}`,
    {
      params: {
        search: query,
      },
    }
  );
  return response;
}
