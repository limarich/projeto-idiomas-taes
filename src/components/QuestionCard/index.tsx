import { useState } from "react";
import styles from "./question-card.module.css";

interface Props {
  question: string;
  answers: Answer[];
  correctAnswer: string;
  onAnswer: (result: "correct" | "incorrect") => void;
}
interface Answer {
  label: string;
  value: string;
}

export const QuestionCard = ({
  question,
  answers,
  correctAnswer,
  onAnswer,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [answerResult, setAnswerResult] = useState<
    "correct" | "incorrect" | null
  >(null);

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer);
    if (answer.value === correctAnswer) {
      setAnswerResult("correct");
    } else {
      setAnswerResult("incorrect");
    }
  };

  const handleAnswerIndex = (index: number) => {
    const options = ["a", "b", "c", "d"];
    if (index <= options.length) return options[index];
    return "";
  };

  const handleOptionClassName = (answer: Answer) => {
    if (!selectedAnswer) return styles.option;
    if (selectedAnswer.value === answer.value && answerResult === "correct") {
      return `${styles.option} ${styles.correct}`;
    }
    if (selectedAnswer.value === answer.value && answerResult === "incorrect") {
      return `${styles.option} ${styles.incorrect}`;
    }
    return styles.option;
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Quizz</h1>
        <hr />
      </header>
      <div className={styles["question-container"]}>
        <h3>{question}</h3>
        <ul className={styles.options}>
          {answers.map((answer, index) => (
            <li key={index}>
              <button
                onClick={() => handleAnswerClick(answer)}
                className={handleOptionClassName(answer)}
              >
                <b>{handleAnswerIndex(index)}</b> {answer.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {answerResult && (
        <button
          onClick={() => {
            onAnswer(answerResult);
            setAnswerResult(null);
          }}
          className={styles["next-btn"]}
        >
          Próxima Pergunta
        </button>
      )}
    </div>
  );
};
