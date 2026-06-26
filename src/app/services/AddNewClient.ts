import axios from "axios";

export async function AddClientService(data: any) {
  const response = await axios.post(
    ` https://api.gleidsonsite.com.br/homepage/AddClient`,
    data
  );
  return response;
}
