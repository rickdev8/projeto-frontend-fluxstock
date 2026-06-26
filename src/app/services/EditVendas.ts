import axios from "axios";

export async function EditVendas<T>(id: string, data: any) {
  const response = await axios.put<T>(
    ` https://api.gleidsonsite.com.br/homepage/EditVendas/${id}`,
    data
  );
  return response;
}
