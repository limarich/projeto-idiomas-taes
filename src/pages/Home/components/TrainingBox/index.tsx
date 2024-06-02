import { Button } from "../../../../components/Button";
import styles from "./training-box.module.css";
import { Link } from "react-router-dom";

interface TrainingBoxProps {
	title: string;
	subtitle: string;
	bgColor: "orange" | "blue" | "purple";
	secondary?: boolean;
	imgSrc: string;
	pathname: string;
}

export function TrainingBox({
	title,
	subtitle,
	bgColor,
	secondary = false,
	imgSrc,
	pathname,
}: TrainingBoxProps) {
	const color = () => {
		if (bgColor === "orange") return "var(--secondary)";
		if (bgColor === "blue") return "var(--primary)";

		return "var(--purple)";
	};
	return (
		<div
			className={`${styles.container} ${secondary ? styles.secondary : ""}`}
			style={{
				backgroundColor: color(),
			}}
		>
			<div className={`${styles.content} ${secondary ? styles.secondary : ""}`}>
				<div
					className={`${styles.gameInfo} ${secondary ? styles.secondary : ""}`}
				>
					<strong>{title}</strong>
					<p className={`${secondary ? styles.secondary : ""}`}>{subtitle}</p>
				</div>
				<Link
					to={pathname}
					style={{
						textDecoration: "none",
					}}
				>
					<Button text="Jogar" />
				</Link>
			</div>
			<img src={imgSrc} alt="preview game" />
		</div>
	);
}
