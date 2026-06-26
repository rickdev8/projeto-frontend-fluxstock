import styles from './Selected.module.css'

interface SelecteProps {
    actived: boolean
}

export const Select = ({ actived }: SelecteProps) => {
  return (
    <div className={styles.checked}>
      <label className={styles.checkbox}>
        <input readOnly checked={actived} type="checkbox" />
        <div className={styles.checkcircle}>
          <svg viewBox="0 0 52 52" className={styles.checkmark}>
            <circle
              fill="none"
              r="25"
              cy="26"
              cx="26"
              className={styles.checkmarkcircle}
            ></circle>
          </svg>
        </div>
      </label>
    </div>
  );
};
