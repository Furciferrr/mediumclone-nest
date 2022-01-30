import { ArticleEntity } from '@app/article/article.entity';

export interface IArticlesResponse {
  articles: Array<ArticleEntity>;
  articlesCount: number;
}
