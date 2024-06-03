import { QuizQuestion } from "../..";
import { Loading } from "../../../../components/Loading";
import { QuestionCard } from "../../../../components/QuestionCard";

interface Props {
  questions: QuizQuestion[];
  currentQuestion: number;
  handleAnswer: (result: "correct" | "incorrect") => void;
  isLoading: boolean;
  hasError: boolean;
}

export const Questions = ({
  currentQuestion,
  handleAnswer,
  isLoading,
  questions,
  hasError,
}: Props) => {
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!hasError && currentQuestion < questions.length && (
            <QuestionCard
              question={questions[currentQuestion].question}
              answers={questions[currentQuestion].alternatives}
              correctAnswer={questions[currentQuestion].answer}
              onAnswer={(result: "correct" | "incorrect") =>
                handleAnswer(result)
              }
            />
          )}
          {hasError && (
            <button onClick={() => window.location.reload()}>
              Erro no servidor, por favor clique aqui para recarregar a página
            </button>
          )}
        </>
      )}
    </div>
  );
};
