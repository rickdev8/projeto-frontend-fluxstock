import axios from "axios";

export async function FindVendaById<T>(id: string) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/findVendasById/${id}`
  );
  return response;
}
