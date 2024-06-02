import styles from "./feedback.module.css";
import { QuizQuestion } from "../..";

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
  const handleFeedback = () => {
    const totalQuestions = quizQuestions.length;

    if (correctAnswers === totalQuestions) {
      return (
        <span className={`${styles.feedback} ${styles.good}`}>Parabéns!!!</span>
      );
    } else if (correctAnswers === 0) {
      return (
        <span className={`${styles.feedback} ${styles.bad}`}>
          Não Desista ainda!
        </span>
      );
    } else {
      return (
        <span className={`${styles.feedback} ${styles.medium}`}>
          Tente praticar mais
        </span>
      );
    }
  };

  return (
    <div className={styles["feedback-container"]}>
      <span className={styles.hits}>acertos:{correctAnswers}</span>
      <span className={styles.errors}>
        erros:{quizQuestions.length - correctAnswers}
      </span>
      {handleFeedback()}
      <button onClick={restartQuiz} className={styles["restart-btn"]}>
        Recomeçar
      </button>

      <button onClick={newQuiz} className={styles["restart-btn"]}>
        Novas perguntas
      </button>
    </div>
  );
};
