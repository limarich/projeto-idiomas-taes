import { QuizQuestion } from "../..";
import { QuestionCard } from "../../../../components/QuestionCard";

interface Props {
  questions: QuizQuestion[];
  currentQuestion: number;
  handleAnswer: (result: "correct" | "incorrect") => void;
  isLoading: boolean;
}

export const Questions = ({
  currentQuestion,
  handleAnswer,
  isLoading,
  questions,
}: Props) => {
  return (
    <div>
      {isLoading ? (
        "carregando..."
      ) : (
        <>
          {currentQuestion < questions.length && (
            <QuestionCard
              question={questions[currentQuestion].question}
              answers={questions[currentQuestion].alternatives}
              correctAnswer={questions[currentQuestion].answer}
              onAnswer={(result: "correct" | "incorrect") =>
                handleAnswer(result)
              }
            />
          )}
        </>
      )}
    </div>
  );
};
