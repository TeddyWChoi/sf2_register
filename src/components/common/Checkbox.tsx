import styles from './Checkbox.module.scss';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  strong?: boolean;
};

export default function Checkbox({ checked, onChange, children, strong = false }: CheckboxProps) {
  return (
    <label className={`${styles.checkbox} ${strong ? styles.strong : ''}`}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.box} aria-hidden="true">
        <svg width="12" height="10" viewBox="0 0 12 10">
          <path d="M1 5l3.5 3.5L11 1" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <span className={styles.label}>{children}</span>
    </label>
  );
}
