import { IdiomOptions } from "../..";
import { Button } from "../../../../components/Button";
import styles from "./menu.module.css";

interface Props {
	selectedOrigin: IdiomOptions;
	selectedObjective: IdiomOptions;
	options: IdiomOptions[];
	onSelectOrigin: (idiom: IdiomOptions) => void;
	onSelectObjective: (idiom: IdiomOptions) => void;
	onQuestionNumberChange: (value: number) => void;
	onNextStepClick: () => void;
}

export const Menu = ({
	onSelectObjective,
	onSelectOrigin,
	options,
	selectedObjective,
	selectedOrigin,
	onQuestionNumberChange,
	onNextStepClick,
}: Props) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<label htmlFor="">Escolha o idioma de origem</label>
				<select
					name="origin"
					id="origin"
					onChange={(e) => onSelectOrigin(e.target.value as IdiomOptions)}
					defaultValue={"portugues"}
				>
					{options.map((option) => (
						<option
							key={`origin-${option}`}
							value={option}
							disabled={selectedObjective === option}
						>
							{option}
						</option>
					))}
				</select>
			</div>
			<div className={styles.content}>
				<label htmlFor="">Escolha o idioma que aprendizado</label>
				<select
					name="objective"
					id="objective"
					onChange={(e) => onSelectObjective(e.target.value as IdiomOptions)}
					defaultValue={"ingles"}
				>
					{options.map((option) => (
						<option
							key={`objective-${option}`}
							value={option}
							disabled={selectedOrigin === option}
						>
							{option}
						</option>
					))}
				</select>
			</div>
			<div className={styles.content}>
				<label htmlFor="">Numero de perguntas</label>
				<input
					type="number"
					step={5}
					defaultValue={10}
					onChange={(e) => onQuestionNumberChange(parseInt(e.target.value, 10))}
				/>
			</div>
			<Button onClick={onNextStepClick} text="proximo" />
		</div>
	);
};
