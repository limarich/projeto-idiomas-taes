import styles from "./feedback.module.css";
import { QuizQuestion } from "../..";
import { getLocalStorageValue } from "../../../../components/utils/localstorage";
import { translations } from "../../../../translations";

interface Props {
  correctAnswers: number;
  quizQuestions: QuizQuestion[];
  restartQuiz: () => void;
  newQuiz: () => void;
}

export const Feedback = ({
  correctAnswers,
  newQuiz,
  quizQuestions,
  restartQuiz,
}: Props) => {
  const originLanguage =
    getLocalStorageValue<string>("originLanguage") || "portugues";

  const { feedback } =
    translations[`${originLanguage as keyof typeof translations}`].quiz;

  const handleFeedback = () => {
    const totalQuestions = quizQuestions.length;

    if (correctAnswers === totalQuestions) {
      return (
        <span className={`${styles.feedback} ${styles.good}`}>
          {feedback.good}
        </span>
      );
    } else if (correctAnswers === 0) {
      return (
        <span className={`${styles.feedback} ${styles.bad}`}>
          {feedback.bad}
        </span>
      );
    } else {
      return (
        <span className={`${styles.feedback} ${styles.medium}`}>
          {feedback.medium}
        </span>
      );
    }
  };

  return (
    <div className={styles["feedback-container"]}>
      <span className={styles.hits}>
        {feedback.hits}
        {correctAnswers}
      </span>
      <span className={styles.errors}>
        {feedback.errors}
        {quizQuestions.length - correctAnswers}
      </span>
      {handleFeedback()}
      <button onClick={restartQuiz} className={styles["restart-btn"]}>
        {feedback.restart}
      </button>

      <button onClick={newQuiz} className={styles["restart-btn"]}>
        {feedback.newQuestions}
      </button>
    </div>
  );
};
