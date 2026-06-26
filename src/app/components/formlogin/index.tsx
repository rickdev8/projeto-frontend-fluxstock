"use client";

import ButtonLogin from "../buttons/ButtonLogin";
import Link from "next/link";
import styles from "./formlogin.module.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/app/context/context";

interface DataLogin {
  email: string;
  password: string;
}

const FormLogin = () => {

  const { register, handleSubmit } = useForm<DataLogin>();

  const { signIn }  = useContext(AuthContext)

  async function handleSignIn(data: any) {
    await signIn(data)
  } 

  return (
    <div className={styles.containerlogin}>
      <form onSubmit={handleSubmit(handleSignIn)} className={styles.form}>
        <p className={styles.title}>Logar na FluxStock </p>
        <p className={styles.message}>
          Informe todos os dados solicitados abaixo, certifique-se de que todos
          os dados inseridos estejam corretos{" "}
        </p>

        <label>
          <input
            placeholder=""
            type="email"
            className={styles.input}
            {...register("email")}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            placeholder=""
            type="password"
            className={styles.input}
            {...register("password")}
          />
          <span>Password</span>
        </label>

        <ButtonLogin style={styles.submit} title="Login" />

        <Link href={"/"}>
          <ButtonLogin style={styles.back} title="Voltar" />
        </Link>

        <Link className={styles.signin} href={"/register"}>
          Ainda não possui uma conta? <p>Cadastre-se</p>{" "}
        </Link>
      </form>
    </div>
  );
};

export default FormLogin;
