import axios from "axios";

export async function TodosClientes<T>(search: string) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/todosClientes`,
    {
      params: {
        search: search,
      },
    }
  );
  return response;
}
