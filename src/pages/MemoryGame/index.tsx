import { useState, useEffect } from "react";
import { MemoryCard } from "../../components/MemoryCard";
import styles from "./memory-game.module.css";
import { useSpeak } from "../../hooks/useSpeak";

interface MemoPair {
  value: string;
  corresponding: string;
}

interface Card extends MemoPair {
  id: number;
}

export const MemoryGame = () => {
  const memoPairs = [
    { value: "home", corresponding: "casa" },
    { value: "man", corresponding: "homem" },
    { value: "kid", corresponding: "criança" },
    { value: "dog", corresponding: "cachorro" },
    { value: "cat", corresponding: "gato" },
    { value: "car", corresponding: "carro" },
    // { value: "tree", corresponding: "árvore" },
    // { value: "book", corresponding: "livro" },
    // { value: "water", corresponding: "água" },
    // { value: "food", corresponding: "comida" },
    // { value: "sun", corresponding: "sol" },
    // { value: "moon", corresponding: "lua" },
    // { value: "star", corresponding: "estrela" },
    // { value: "house", corresponding: "casa" },
    // { value: "woman", corresponding: "mulher" },
    // { value: "child", corresponding: "criança" },
    // { value: "bird", corresponding: "pássaro" },
    // { value: "fish", corresponding: "peixe" },
    // { value: "school", corresponding: "escola" },
    // { value: "teacher", corresponding: "professor" },
  ];

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  const { speak } = useSpeak();

  useEffect(() => {
    const shuffledCards = shuffleArray(
      memoPairs.flatMap((pair, index) => [
        { id: index * 2, value: pair.value, corresponding: pair.corresponding },
        {
          id: index * 2 + 1,
          value: pair.corresponding,
          corresponding: pair.value,
        },
      ])
    );
    setCards(shuffledCards);
  }, []);

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
    </div>
  );
};
