import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	width?: number;
	variant?: "primary" | "secondary";
}

export function Button({
	text,
	width,
	variant = "primary",
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={`${styles.container} ${
				variant == "primary" ? styles.primary : styles.secondary
			}`}
			style={{
				width: width ? `${width}px` : "auto",
			}}
		>
			{text}
		</button>
	);
}
