import axios from "axios";

export async function EditProductRoutePost<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` https://api.gleidsonsite.com.br/homepage/editProoduct/${id}`,
    data
  );
  return response;
}
