import axios from "axios";

export async function AddVendaService(data: any) {
  const response = await axios.post(
    " https://api.gleidsonsite.com.br/homepage/AddNewVenda",
    data
  );
  return response;
}
