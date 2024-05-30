import { Button } from "../../../../components/Button";
import styles from "./hero-section.module.css";

export function HeroSection() {
	return (
		<div className={styles.container}>
			<img
				src="/blob-blue.svg"
				alt="fundo blob azul"
				className={styles.backgroundImg}
			/>
			<div className={styles.content}>
				<img src="/dog-happy.svg" alt="dog-happy" className={styles.dog} />
				<h2 className={styles.heroText}>Aprenda inglês se divertindo</h2>
			</div>

			<div className={styles.actionsBox}>
				<Button text="Vamos começar" width={320} />
				<Button
					text="Já tenho uma conta"
					width={320}
					className={styles.button}
					variant="secondary"
				/>
			</div>
		</div>
	);
}
