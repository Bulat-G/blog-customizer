import { CSSProperties, useState } from 'react';

import { Article } from '../components/article/Article';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [stateArticle, setStateArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': stateArticle.fontFamilyOption.value,
					'--font-size': stateArticle.fontSizeOption.value,
					'--font-color': stateArticle.fontColor.value,
					'--container-width': stateArticle.contentWidth.value,
					'--bg-color': stateArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateArticle={stateArticle}
				setStateArticle={setStateArticle}
			/>
			<Article />
		</main>
	);
};
