"use client";

import ButtonLogin from "../buttons/ButtonLogin";
import Link from "next/link";
import styles from "./formregister.module.css";
import { useForm } from "react-hook-form";
import { registerUser } from "@/app/services/userService";

interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormRegister = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserData>();

  const RegisterUser = async (data: UserData) => {
    try {
      const response = await registerUser(data);

      if (response.status === 201) {
        window.alert("Sucesso!");
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        window.alert(error.response.data.message);
        console.log(error);
      } else {
        window.alert("Erro inesperado!");
        console.error(error);
      }
    }
  };

  const passwordValue = watch("password");

  return (
    <div className={styles.containerRegister}>
      <form onSubmit={handleSubmit(RegisterUser)} className={styles.form}>
        <p className={styles.title}>Registrar na FluxStock</p>
        <p className={styles.message}>
          Informe todos os dados solicitados abaixo, certifique-se de que todos os dados estejam corretos.
        </p>

        <div className={styles.inputGroup}>
          <label>
            <input
              type="text"
              className={styles.input}
              {...register("name", {
                required: "Nome é obrigatório",
                minLength: { value: 6, message: "O nome deve ter pelo menos 6 caracteres" },
                pattern: { value: /^[a-zA-ZÀ-ÿ\s]+$/, message: "O nome só pode conter letras e espaços" }
              })}
              placeholder="Nome completo"
            />
            <span>Nome</span>
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label>
            <input
              type="email"
              className={styles.input}
              {...register("email", {
                required: "Email é obrigatório",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
              })}
              placeholder="exemplo@email.com"
            />
            <span>Email</span>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label>
            <input
              type="password"
              className={styles.input}
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: "A senha deve ter letras e números" }
              })}
              placeholder="Senha"
            />
            <span>Senha</span>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label>
            <input
              type="password"
              className={styles.input}
              {...register("confirmPassword", {
                required: "Confirme a senha",
                validate: value => value === passwordValue || "As senhas não coincidem"
              })}
              placeholder="Confirme sua senha"
            />
            <span>Confirmar senha</span>
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <ButtonLogin style={styles.submit} title="Registrar" />
          <Link href="/">
            <ButtonLogin style={styles.back} title="Voltar" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
