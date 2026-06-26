import axios from "axios";

export async function EditProductRoute<T>(id: string) {
  const response = await axios.get<T>(
    ` https://api.gleidsonsite.com.br/homepage/editProoductId/${id}`
  );
  return response;
}
