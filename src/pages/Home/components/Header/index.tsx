import { Button } from "../../../../components/Button";
import styles from "./header.module.css";

export function Header() {
	return (
		<header className={styles.container}>
			<h1>FoxTeacher</h1>
			<div className={styles.boxButton}>
				<Button text="Fazer Login" width={320} />
			</div>
		</header>
	);
}
