"use client"

import ContainerLoginAndRegister from "../components/containers/ContainerLoginAndRegister";
import HeaderLogin from "../components/headerform";
import LoginInput from "../components/formlogin";
import ResponsiveAppBar from "../components/navbar";
import { AuthProvider } from "../context/context";

const Login = () => {
  const imgheader = "/login-pana.svg";

  const titleheader = "Despesas no radar, fim do mês garantido";

  const textheader = `Cansado de se enrolar no caixa? Com o Kyte, é só abrir, vender e
          pronto! Tudo no seu controle, sem surpresas. Nosso Ponto de Vendas
          transforma cada contato em uma oportunidade de encantar seus clientes
          e fazer seu negócio crescer.`;

  return (
    <>
      <AuthProvider>
        <ResponsiveAppBar />
        <ContainerLoginAndRegister>
          <HeaderLogin
            imgUrl={imgheader}
            title={titleheader}
            text={textheader}
          />
          <LoginInput />
        </ContainerLoginAndRegister>
      </AuthProvider>
    </>
  );
};

export default Login;
