import React, { useContext, useMemo } from 'react';
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

type EarlierArticlesProps = {
  currentArticleUrl: string | undefined;
  recentArticleUrls: string[];
};

const EarlierArticles: React.FC<EarlierArticlesProps> = ({ currentArticleUrl, recentArticleUrls }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const earlierArticles = useMemo(() => {
    const filteredArticles = articlesData.filter((article: Article) => 
      article.articleUrl !== currentArticleUrl && !recentArticleUrls.includes(article.articleUrl)
    );
    
    // Shuffle the filtered articles
    for (let i = filteredArticles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredArticles[i], filteredArticles[j]] = [filteredArticles[j], filteredArticles[i]];
    }

    return filteredArticles.slice(0, 5);
  }, [currentArticleUrl, recentArticleUrls]);

  return (
    <div className={`earlier-articles-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <h3 className="earlier-articles-title">Earlier Articles</h3>
      <ul className="earlier-articles-list">
        {earlierArticles.map((article: Article) => (
          <li key={article.id} className="earlier-article-item">
            <img 
              className="article-image"
              src={article.img} 
              alt={article.header}
            />
            <div className="article-info">
              <CustomLink 
                to={`/article/${article.articleUrl}`}
                className="earlier-article-link"
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

export default EarlierArticles;