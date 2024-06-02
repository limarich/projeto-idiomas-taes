import { Button } from "../../../../components/Button";
import { getLocalStorageValue } from "../../../../components/utils/localstorage";
import { translations } from "../../../../translations";
import styles from "./hero-section.module.css";

export function HeroSection() {
  const originLanguage =
    getLocalStorageValue<string>("originLanguage") || "portugues";

  const { heroSection } =
    translations[originLanguage as keyof typeof translations].home;

  return (
    <div className={styles.container}>
      <img
        src="/blob-blue.svg"
        alt="fundo blob azul"
        className={styles.backgroundImg}
      />
      <div className={styles.content}>
        <img src="/dog-happy.svg" alt="dog-happy" className={styles.dog} />
        <h2 className={styles.heroText}>{heroSection.description}</h2>
      </div>

      <div className={styles.actionsBox}>
        <Button text={heroSection.getStartButton} width={320} />
        <Button
          text={heroSection.AlreadyHasAccount}
          width={320}
          className={styles.button}
          variant="secondary"
        />
      </div>
    </div>
  );
}
