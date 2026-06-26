import axios from "axios";

export async function AddSuplierService(data: any) {
  const response = await axios.post(
    " https://api.gleidsonsite.com.br/homepage/addFornecedor",
    data
  );
  return response;
}
