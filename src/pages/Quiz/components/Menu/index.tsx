import { IdiomOptions } from "../..";
import { getLocalStorageValue } from "../../../../components/utils/localstorage";
import { translations } from "../../../../translations";
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
	options,
	selectedOrigin,
	onQuestionNumberChange,
	onNextStepClick,
}: Props) => {
	const originLanguage =
		getLocalStorageValue<string>("originLanguage") || "portugues";

	const { menu } =
		translations[`${originLanguage as keyof typeof translations}`].quiz;

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<label htmlFor="">{menu.selectObjectiveIdiom}</label>
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
				<label htmlFor="">{menu.numberOfAnswers}</label>
				<input
					type="number"
					step={5}
					defaultValue={10}
					onChange={(e) => onQuestionNumberChange(parseInt(e.target.value, 10))}
				/>
			</div>
			<Button onClick={onNextStepClick} text={menu.nextButton} />
		</div>
	);
};
