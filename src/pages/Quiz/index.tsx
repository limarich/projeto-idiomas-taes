import { useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import styles from "./quiz.module.css";

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const questions = [
    {
      question: "Como se diz Macaco 🐒 em inglês?",
      answers: [
        { value: "A", label: "Monkey" },
        { value: "B", label: "Kid" },
        { value: "C", label: "Fancy" },
        { value: "D", label: "Frog" },
      ],
      correctAnswer: "A",
    },
    {
      question: "Qual é a capital do Brasil?",
      answers: [
        { value: "A", label: "Rio de Janeiro" },
        { value: "B", label: "São Paulo" },
        { value: "C", label: "Brasília" },
        { value: "D", label: "Belo Horizonte" },
      ],
      correctAnswer: "C",
    },
    {
      question: "Quem escreveu 'Romeu e Julieta'?",
      answers: [
        { value: "A", label: "William Shakespeare" },
        { value: "B", label: "Charles Dickens" },
        { value: "C", label: "Jane Austen" },
        { value: "D", label: "Mark Twain" },
      ],
      correctAnswer: "A",
    },
    {
      question: "Qual é o maior planeta do sistema solar?",
      answers: [
        { value: "A", label: "Marte" },
        { value: "B", label: "Júpiter" },
        { value: "C", label: "Vênus" },
        { value: "D", label: "Saturno" },
      ],
      correctAnswer: "B",
    },
  ];

  const handleAnswer = (result: "correct" | "incorrect") => {
    if (result === "correct") {
      setCorrectAnswers((previous) => previous + 1);
    }
    setCurrentQuestion((previous) => previous + 1);
  };

  const handleFeedback = () => {
    const result = correctAnswers - questions.length / 2;

    if (result > 0)
      return (
        <span className={`${styles.feedback} ${styles.good}`}>Parabéns!!!</span>
      );
    if (result === 0)
      return (
        <span className={`${styles.feedback} ${styles.medium}`}>
          Tente praticar mais
        </span>
      );
    return (
      <span className={`${styles.feedback} ${styles.bad}`}>
        Não Desista ainda!
      </span>
    );
  };

  return (
    <div className={styles.container}>
      {currentQuestion < questions.length ? (
        <QuestionCard
          question={questions[currentQuestion].question}
          answers={questions[currentQuestion].answers}
          correctAnswer={questions[currentQuestion].correctAnswer}
          onAnswer={(result: "correct" | "incorrect") => handleAnswer(result)}
        />
      ) : (
        <div className={styles["feedback-container"]}>
          <span className={styles.hits}>acertos:{correctAnswers} </span>
          <span className={styles.errors}>
            erros:{questions.length - correctAnswers}{" "}
          </span>
          {handleFeedback()}

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setCorrectAnswers(0);
            }}
            className={styles["restart-btn"]}
          >
            Recomeçar
          </button>
        </div>
      )}
    </div>
  );
};
