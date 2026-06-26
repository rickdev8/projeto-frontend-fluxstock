import ContainerLoginAndRegister from "../components/containers/ContainerLoginAndRegister";
import FormRegister from "../components/formregister/HeaderRegister";
import HeaderForm from "../components/headerform";
import ResponsiveAppBar from "../components/navbar";

const Register = () => {
  const title = "Estoque sempre em dia, sem surpresas";

  const text = `Esqueça a dor de cabeça de descobrir que vendeu o que não tinha. Com o Kyte, seu estoque se 
    atualiza sozinho. Assim, 
    você sabe sempre o que tem e o que precisa.`;

  return (
    <>
      <ResponsiveAppBar />
      <ContainerLoginAndRegister>
        <HeaderForm
          text={text}
          title={title}
          imgUrl="/login-pana.svg"
        ></HeaderForm>
        <FormRegister />
      </ContainerLoginAndRegister>
    </>
  );
};

export default Register;
