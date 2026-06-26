import axios from "axios";

export async function DeleteClient<T>(id: string) {
  const response = await axios.delete<T>(
    ` https://api.gleidsonsite.com.br/homepage/deleteClient/${id}`
  );
  return response;
}
