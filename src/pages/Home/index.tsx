import { getLocalStorageValue } from "../../components/utils/localstorage";
import { translations } from "../../translations";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { TrainingBox } from "./components/TrainingBox";

import styles from "./home.module.css";

export const Home = () => {
  const originLanguage =
    getLocalStorageValue<string>("originLanguage") || "portugues";

  const { descriptionSection } =
    translations[`${originLanguage as keyof typeof translations}`].home;

  return (
    <div className={styles.container}>
      <img className={styles.blob} src="\blob-mask.svg" alt="blob-draw" />
      <Header />
      <main className={styles.main}>
        <HeroSection />

        <h2 className={styles.infoText}>
          {descriptionSection.infoText[0]}{" "}
          <span className={styles.span}>{descriptionSection.infoText[1]}</span>{" "}
          {descriptionSection.infoText[2]}
        </h2>

        <div className={styles.trainings}>
          <strong>{descriptionSection.trainings.title}</strong>
          <div className={styles.boxTrainings}>
            <TrainingBox
              title={descriptionSection.trainings.boxTrainings[0].title}
              subtitle={descriptionSection.trainings.boxTrainings[0].subtitle}
              bgColor="orange"
              imgSrc="./frame-quiz.png"
              pathname="/quiz"
              actionButtonText={
                descriptionSection.trainings.boxTrainings[0].action
              }
            />
            <TrainingBox
              title={descriptionSection.trainings.boxTrainings[1].title}
              subtitle={descriptionSection.trainings.boxTrainings[1].subtitle}
              bgColor="blue"
              imgSrc="./frame-puzzle.png"
              secondary
              pathname="/memory-game"
              actionButtonText={
                descriptionSection.trainings.boxTrainings[1].action
              }
            />
            <TrainingBox
              title={descriptionSection.trainings.boxTrainings[2].title}
              subtitle={descriptionSection.trainings.boxTrainings[2].subtitle}
              bgColor="purple"
              imgSrc="./frame-talk.png"
              pathname="/"
              actionButtonText={
                descriptionSection.trainings.boxTrainings[2].action
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};
