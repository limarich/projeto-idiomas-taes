import styles from "./training-box.module.css";

interface TrainingBoxProps {
	title: string;
	subtitle: string;
	bgColor: "orange" | "blue" | "purple";
	secondary?: boolean;
	imgSrc: string;
}

export function TrainingBox({
	title,
	subtitle,
	bgColor,
	secondary = true,
	imgSrc,
}: TrainingBoxProps) {
	const color = () => {
		if (bgColor === "orange") return "var(--secondary)";
		if (bgColor === "blue") return "var(--primary)";

		return "var(--purple)";
	};
	return (
		<div
			className={`${styles.container} ${secondary ?? styles.secondary}`}
			style={{
				backgroundColor: color(),
			}}
		>
			<div className={styles.content}>
				<strong>{title}</strong>
				<p>{subtitle}</p>
			</div>
			<img src={imgSrc} alt="preview game" />
		</div>
	);
}
