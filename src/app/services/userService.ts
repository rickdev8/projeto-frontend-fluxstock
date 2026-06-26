import axios from "axios";

export async function registerUser(data: any) {
  const response = await axios.post(
    " https://api.gleidsonsite.com.br/register",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function loginUser(data: any) {
  const response = await axios.post(
    " https://api.gleidsonsite.com.br/login",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function AuthUser() {
  const response = await axios.post(
    " https://api.gleidsonsite.com.br/login/auth",
    {},
    {
      withCredentials: true,
    }
  );

  return response;
}
