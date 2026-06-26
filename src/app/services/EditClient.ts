import axios from "axios";

export async function EditClientRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` https://api.gleidsonsite.com.br/homepage/editClient/${id}`,
    data
  );
  return response;
}
