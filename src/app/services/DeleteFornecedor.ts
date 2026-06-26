import axios from "axios";

export async function DeleteFornecedor<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://api.gleidsonsite.com.br/homepage/deleteFornecedor/${id}`
  );
  return response;
}
