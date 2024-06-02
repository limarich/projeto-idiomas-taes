import { useEffect, useState } from "react";
import { QuestionCard } from "../../components/QuestionCard";
import styles from "./quiz.module.css";
import { useGeminiApi } from "../../hooks/useGeminiApi";

interface QuizQuestion {
  question: string;
  answer: string;
  alternatives: string[];
}

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const { requestApi, isLoading } = useGeminiApi();

  const qt_perguntas = 10;
  const idioma_fonte = "português";
  const idioma_objeto = "inglês";

  const json_schema =
    '{"question": string, "answer": string, "alternatives": string[]}';
  const exemplo =
    '[{"question": "Qual é a tradução da palavra \'Tree\' em português?", "answer": "Árvore", "alternatives": ["Três", "Galho", "Tronco", "Árvore"]}]';

  const prompt = `Me dê ${qt_perguntas} perguntas aleatórias em formato de quiz a respeito da tradução de palavras quaisquer no idioma fonte: ${idioma_fonte} para o idioma objeto: ${idioma_objeto}. Usando o seguinte esquema JSON: ${json_schema}. Retorne apenas um array de questões. Seguindo exatamente no seguinte formato: ${exemplo}. Deixe todas as palavras em formato UNICODE e lembre sempre de incluir a resposta no array de alternativas. O nome do campo de respostas deve ser answer.`;

  const fetchQuestionsData = async () => {
    const res = await requestApi<QuizQuestion[]>(prompt);
    if (res) {
      setQuizQuestions(res);
    }
  };

  useEffect(() => {
    fetchQuestionsData();
  }, []);

  const handleAnswer = (result: "correct" | "incorrect") => {
    if (result === "correct") {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

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

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };
  const newQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    fetchQuestionsData();
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        "carregando..."
      ) : (
        <>
          {currentQuestion < quizQuestions.length ? (
            <QuestionCard
              question={quizQuestions[currentQuestion].question}
              answers={quizQuestions[currentQuestion].alternatives}
              correctAnswer={quizQuestions[currentQuestion].answer}
              onAnswer={(result: "correct" | "incorrect") =>
                handleAnswer(result)
              }
            />
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};
