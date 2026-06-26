import axios from "axios";

export async function GetAllProducts<T>(
  page: number,
  limit: number,
  filter: string,
  valuesearch: string
) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/allProducts/${page}/${limit}`,
    {
      params: {
        filtro: filter,
        search: valuesearch,
      },
    }
  );
  return response;
}
