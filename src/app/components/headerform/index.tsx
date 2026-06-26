import Image from "next/image";
import styles from "./headerlogin.module.css";
import ContainerLoginAndRegister from "../containers/ContainerLoginAndRegister";

interface HeaderLoginProps {
  imgUrl: string,
  title: string,
  text: string
}

export const HeaderForm = ({ imgUrl, title, text }: HeaderLoginProps) => {
  return (
   <ContainerLoginAndRegister>
     <div className={styles["image-header-login"]}>
        <Image
          width={500}
          height={500}
          src={imgUrl}
          alt="header-image-login"
        />
      </div>
      <div className={styles["text-header-login"]}>
        <h1>{title}</h1>
        <p>
          {text}
        </p>
      </div>
   </ContainerLoginAndRegister>
  );
};

export default HeaderForm