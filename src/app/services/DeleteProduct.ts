import axios from "axios";

export async function DeleteProduct<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://api.gleidsonsite.com.br/homepage/deleteProduct/${id}`
  );
  return response;
}
