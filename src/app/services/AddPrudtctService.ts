import axios from "axios";
import { GetAllProducts } from "./GetAllProducts";

export async function AddProductService(data: any) {
  const response = await axios.post(
    ` https://api.gleidsonsite.com.br/homepage/addProduct`,
    data
  );
  return response;
}
