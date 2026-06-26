import axios from "axios";

export async function FilterClientSearch<T>(busca: string) {
  if (busca) {
    const response = await axios.get<T>(
      ` https://api.gleidsonsite.com.br/homepage/filterCliente`,
      {
        params: {
          search: busca,
        },
      }
    );
    return response;
  } else {
    return;
  }
}
