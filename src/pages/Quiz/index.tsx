import { useState } from "react";
import styles from "./quiz.module.css";
import { useGeminiApi } from "../../hooks/useGeminiApi";
import { Questions } from "./components/Questions";
import { Feedback } from "./components/Feedback";
import { Menu } from "./components/Menu";
import { useNavigate } from "react-router-dom";

export interface QuizQuestion {
  question: string;
  answer: string;
  alternatives: string[];
}

type step = "menu" | "quiz" | "feedback";
export type IdiomOptions =
  | "ingles"
  | "portugues"
  | "italiano"
  | "mandarim"
  | "japones"
  | "espanhol";

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [step, setStep] = useState<step>("menu");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [originLanguage, setOriginLanguage] =
    useState<IdiomOptions>("portugues");
  const [objectiveLanguage, setObjectiveLanguage] =
    useState<IdiomOptions>("ingles");
  const [questionsNumber, setQuestionsNumber] = useState(10);

  const { requestApi, isLoading, hasError } = useGeminiApi();

  const json_schema =
    '{"question": string, "answer": string, "alternatives": string[]}';
  const exemplo =
    '[{"question": "Qual é a tradução da palavra \'Tree\' em português?", "answer": "Árvore", "alternatives": ["Três", "Galho", "Tronco", "Árvore"]}]';

  const prompt = `Me dê ${questionsNumber} perguntas aleatórias em formato de quiz a respeito da tradução de palavras quaisquer no idioma fonte: ${originLanguage} para o idioma objeto: ${objectiveLanguage}. Usando o seguinte esquema JSON: ${json_schema}. Retorne apenas um array de questões. Seguindo exatamente no seguinte formato: ${exemplo}. Deixe todas as palavras em formato UNICODE e lembre sempre de incluir a resposta no array de alternativas. O nome do campo de respostas deve ser answer. É importante que a pergunta esteja no mesmo idioma que a origem.Retorne apenas o objeto no formato solicitado.`;

  const fetchQuestionsData = async () => {
    const res = await requestApi<QuizQuestion[]>(prompt);
    if (res) {
      setQuizQuestions(res);
    }
  };

  const handleAnswer = (result: "correct" | "incorrect") => {
    if (result === "correct") {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setStep("quiz");
  };

  const newQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    fetchQuestionsData();
    setStep("quiz");
  };

  const handleStep = () => {
    if (step === "quiz") {
      if (currentQuestion === quizQuestions.length) {
        setStep("feedback");
      }
      return (
        <Questions
          questions={quizQuestions}
          currentQuestion={currentQuestion}
          handleAnswer={handleAnswer}
          isLoading={isLoading}
          hasError={hasError}
        />
      );
    }
    if (step === "feedback") {
      return (
        <Feedback
          correctAnswers={correctAnswers}
          newQuiz={newQuiz}
          quizQuestions={quizQuestions}
          restartQuiz={restartQuiz}
        />
      );
    }
    if (step === "menu") {
      const options: IdiomOptions[] = [
        "espanhol",
        "ingles",
        "italiano",
        "japones",
        "mandarim",
        "portugues",
      ];
      return (
        <Menu
          onSelectOrigin={(idiom: IdiomOptions) => setOriginLanguage(idiom)}
          onSelectObjective={(idiom: IdiomOptions) =>
            setObjectiveLanguage(idiom)
          }
          options={options}
          selectedObjective={objectiveLanguage}
          selectedOrigin={originLanguage}
          onQuestionNumberChange={(value: number) => setQuestionsNumber(value)}
          onNextStepClick={() => {
            setStep("quiz");
            fetchQuestionsData();
          }}
        />
      );
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: "999",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Voltar
      </button>
      {handleStep()}
    </div>
  );
};
