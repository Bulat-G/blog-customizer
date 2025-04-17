import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	headSelect,
	OptionType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';

interface ArticleParamsFormProps {
	stateArticle: ArticleStateType;
	setStateArticle: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	stateArticle,
	setStateArticle,
}: ArticleParamsFormProps) => {
	const [selectedStateArticle, setSelectedStateArticle] =
		useState<ArticleStateType>(stateArticle);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => !isOpen,
		onChange: setIsOpen,
	});

	const handleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedStateArticle({ ...selectedStateArticle, [key]: value });
	};

	const handleSubmitStateArticle = (evt: SyntheticEvent) => {
		evt.preventDefault();
		setStateArticle(selectedStateArticle);
	};

	const handleResetStateArticle = () => {
		setSelectedStateArticle(stateArticle);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					style={{ rowGap: 50 }}
					className={styles.form}
					onSubmit={handleSubmitStateArticle}
					onReset={handleResetStateArticle}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={headSelect.fontFamily}
						selected={selectedStateArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(options) =>
							handleChangeSelectedState('fontFamilyOption', options)
						}
					/>
					<RadioGroup
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={selectedStateArticle.fontSizeOption}
						title={headSelect.fontSize}
						onChange={(options) =>
							handleChangeSelectedState('fontSizeOption', options)
						}
					/>
					<Select
						title={headSelect.fontColor}
						selected={selectedStateArticle.fontColor}
						options={fontColors}
						onChange={(options) =>
							handleChangeSelectedState('fontColor', options)
						}
					/>
					<Separator />
					<Select
						title={headSelect.backgroundColor}
						selected={selectedStateArticle.backgroundColor}
						options={backgroundColors}
						onChange={(options) =>
							handleChangeSelectedState('backgroundColor', options)
						}
					/>
					<Select
						title={headSelect.contentWidth}
						selected={selectedStateArticle.contentWidth}
						options={contentWidthArr}
						onChange={(options) =>
							handleChangeSelectedState('contentWidth', options)
						}
					/>
					<div
						className={styles.bottomContainer}
						style={{
							paddingTop: 157,
						}}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
