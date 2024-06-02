import { useState, useEffect } from "react";
import { MemoryCard } from "../../components/MemoryCard";
import styles from "./memory-game.module.css";
import { useSpeak } from "../../hooks/useSpeak";
import { IdiomOptions } from "../Quiz";
import { useGeminiApi } from "../../hooks/useGeminiApi";

interface MemoPair {
  value: string;
  corresponding: string;
}

interface Card extends MemoPair {
  id: number;
}

export const MemoryGame = () => {
  const options: IdiomOptions[] = [
    "espanhol",
    "ingles",
    "italiano",
    "japones",
    "mandarim",
    "portugues",
  ];
  const [originLanguage, setOriginLanguage] =
    useState<IdiomOptions>("portugues");
  const [objectiveLanguage, setObjectiveLanguage] =
    useState<IdiomOptions>("ingles");
  const [memoPairs, setMemoPairs] = useState<MemoPair[]>([]);
  const [cardsNumber, setCardsNumber] = useState(10);

  const { requestApi, isLoading } = useGeminiApi();

  const json_schema = '{ value: "string", corresponding: "string" }';
  const exemplo = '[{ value: "home", corresponding: "casa" }]';

  const prompt = `Me dê ${cardsNumber} nomes no idioma fonte: ${originLanguage} para o idioma objeto: ${objectiveLanguage}. Usando o seguinte esquema JSON: ${json_schema}. Seguindo exatamente no seguinte formato: ${exemplo}. Deixe todas as palavras em formato UNICODE. Retorne apenas o array`;

  const fetchQuestionsData = async () => {
    const res = await requestApi<MemoPair[]>(prompt);
    if (res) {
      console.log(res);
      setMemoPairs(res);
    }
  };

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  const { speak } = useSpeak();

  useEffect(() => {
    if (memoPairs) {
      const shuffledCards = shuffleArray(
        memoPairs.flatMap((pair, index) => [
          {
            id: index * 2,
            value: pair.value,
            corresponding: pair.corresponding,
          },
          {
            id: index * 2 + 1,
            value: pair.corresponding,
            corresponding: pair.value,
          },
        ])
      );
      setCards(shuffledCards);
    }
  }, [memoPairs]);

  const shuffleArray = (array: Card[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    speak(cards[index].value);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (
        firstCard.value === secondCard.corresponding ||
        firstCard.corresponding === secondCard.value
      ) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      }

      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Jogo da Memória</h1>
      <button
        onClick={() => {
          fetchQuestionsData();
        }}
      >
        iniciar
      </button>
      <select
        name="cards-number"
        onChange={(e) => setCardsNumber(parseInt(e.target.value, 10))}
      >
        <option value="" defaultChecked disabled>
          {" "}
          escolha uma quantidade
        </option>
        <option value="5">10</option>
        <option value="10">20</option>
        <option value="15">30</option>
      </select>

      <select
        name="objective"
        id="objective"
        onChange={(e) => setObjectiveLanguage(e.target.value as IdiomOptions)}
        defaultValue={"ingles"}
      >
        {options.map((option) => (
          <option
            key={`objective-${option}`}
            value={option}
            disabled={objectiveLanguage === option}
          >
            {option}
          </option>
        ))}
      </select>
      {isLoading ? (
        "Carregando..."
      ) : (
        <div className={styles["memory-cards-wrapper"]}>
          {cards.map((card, index) => (
            <MemoryCard
              key={card.id}
              value={card.value}
              onClick={() => handleCardClick(index)}
              isFlipped={flippedCards.includes(index)}
              isMatched={matchedCards.includes(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
