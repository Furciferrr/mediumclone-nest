import { ArticleType } from './article.type';

export interface IArticlesResponse {
  articles: Array<ArticleType>;
  articlesCount: number;
}
