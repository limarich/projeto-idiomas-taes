import { Header } from "./components/Header";
import styles from "./home.module.css";

export const Home = () => {
	return (
		<div className={styles.container}>
			<Header />
			<main></main>
		</div>
	);
};
