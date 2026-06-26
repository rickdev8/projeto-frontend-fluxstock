import axios from "axios";

export async function DeleteVenda<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://api.gleidsonsite.com.br/homepage/DeleteVenda/${id}`
  );
  return response;
}
