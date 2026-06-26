import styles from "./LoadingTable.module.css";

export const LoadingTables = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
      </div>
    </div>
  );
};
