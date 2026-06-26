import axios from "axios";

export async function ViaCep(cep: string) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response;
}
