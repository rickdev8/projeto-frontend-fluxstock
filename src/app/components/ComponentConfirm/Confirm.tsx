import styles from "./Confirm.module.css";

interface ConfirmProps {
  mensagem: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Confirm = ({ mensagem, onConfirm, onCancel }: ConfirmProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{mensagem}</h2>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
