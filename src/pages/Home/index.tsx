import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { TrainingBox } from "./components/TrainingBox";
import styles from "./home.module.css";

export const Home = () => {
	return (
		<div className={styles.container}>
			<img className={styles.blob} src="\blob-mask.svg" alt="blob-draw" />
			<Header />
			<main className={styles.main}>
				<HeroSection />

				<h2 className={styles.infoText}>
					Nossa Plataforma utiliza de <span className={styles.span}>IA</span>{" "}
					para adaptar cada lição ao seu ritmo e necessidade
				</h2>

				<div className={styles.trainings}>
					<strong>Nossos Treinos</strong>
					<div className={styles.boxTrainings}>
						<TrainingBox
							title="Quiz"
							subtitle="Escolha a tradução certa para uma palavra especifica"
							bgColor="orange"
							imgSrc="./frame-quiz.png"
							pathname="/quiz"
						/>
						<TrainingBox
							title="Quebra Cabeça"
							subtitle="Combine palavras em inglês com suas traduções para resolver o desafio."
							bgColor="blue"
							imgSrc="./frame-puzzle.png"
							secondary
							pathname="/quiz"
						/>
						<TrainingBox
							title="Conversação"
							subtitle="Seja inserido em contextos do dia a dia e escreva respostas válidas para cada situação"
							bgColor="purple"
							imgSrc="./frame-talk.png"
							pathname="/quiz"
						/>
					</div>
				</div>
			</main>
		</div>
	);
};
