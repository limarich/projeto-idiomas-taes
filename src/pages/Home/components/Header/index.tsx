import styles from "./header.module.css";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../../../../components/utils/localstorage";

export function Header() {
  const options = [
    "espanhol",
    "ingles",
    "italiano",
    "japones",
    "mandarim",
    "portugues",
  ];
  const defaultValue = getLocalStorageValue<string>("originLanguage") || "";

  return (
    <header className={styles.container}>
      <h1>FoxTeacher</h1>
      <div className={styles.boxButton}>
        <div className={styles["custom-select"]}>
          <select
            name="origin"
            id="origin"
            onChange={(e) => {
              setLocalStorageValue("originLanguage", e.target.value);
              window.location.reload();
            }}
            defaultValue={defaultValue}
          >
            {options.map((option) => (
              <option key={`objective-${option}`} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
