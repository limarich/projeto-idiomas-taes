import { Button } from "../../../../components/Button";
import styles from "./header.module.css";

export function Header() {
	return (
		<header className={styles.container}>
			<img className={styles.blob} src="\blob-header.svg" alt="blob-draw" />
			<h1>FoxTeacher</h1>
			<Button text="Fazer Login" />
		</header>
	);
}
