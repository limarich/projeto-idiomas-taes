import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

export function Button({ text, ...props }: ButtonProps) {
	return (
		<button {...props} className={styles.container}>
			{text}
		</button>
	);
}
