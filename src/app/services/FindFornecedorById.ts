import axios from "axios";

export async function GetFornecedorBtId<T>(id: string) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/findFornecedorById/${id}`
  );
  return response;
}
