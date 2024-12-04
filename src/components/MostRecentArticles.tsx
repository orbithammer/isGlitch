import React, { useContext } from 'react';
import { articlesData } from '../data/articles';
import ThemeContext from "../utils/ThemeContext"
import CustomLink from './CustomLink';

type Article = {
  id: number;
  articleUrl: string;
  header: string;
  datePublished: Date;
  img: string;
  author: string;
};

type MostRecentArticlesProps = {
  currentArticleUrl: string | undefined;
}

const MostRecentArticles: React.FC<MostRecentArticlesProps> = ({ currentArticleUrl }) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  const recentArticles = articlesData
    .filter((article: Article) => article.articleUrl !== currentArticleUrl)
    .sort((a: Article, b: Article) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 5);

  return (
    <div className={`recent-articles-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <h3 className="recent-articles-title">Most Recent Articles</h3>
      <ul className="recent-articles-list">
        {recentArticles.map((article: Article) => (
          <li key={article.id} className="recent-article-item">
            <img 
              className="article-image"
              src={article.img} 
              alt={article.header}
            />
            <div className="recent-article-info">
              <CustomLink 
                to={`/article/${article.articleUrl}`}
                className="recent-article-link"
              >
                {article.header}
              </CustomLink>
              <span className="article-author">By {article.author}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostRecentArticles;