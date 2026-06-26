import { Header } from "./components/header/Header";
import ResponsiveAppBar from "./components/navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
  
      <div className={styles.page}>
        <ResponsiveAppBar />
        <Header />
      </div>
   
  );
}
