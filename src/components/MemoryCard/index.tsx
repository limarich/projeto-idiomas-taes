import styles from "./memory-card.module.css";

interface Props {
  value: string;
  onClick: () => void;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryCard = ({ value, onClick, isFlipped, isMatched }: Props) => {
  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""} ${
        isMatched ? styles.matched : ""
      }`}
      onClick={onClick}
    >
      {isFlipped || isMatched ? value : "?"}
    </div>
  );
};
