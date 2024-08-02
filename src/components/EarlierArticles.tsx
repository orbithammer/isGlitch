import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
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

const EarlierArticlesWrapper = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
`;

const EarlierArticlesTitle = styled.h3`
  font-family: "Fjalla One", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const EarlierArticlesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EarlierArticleItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const EarlierArticleLink = styled(CustomLink)`
  color: ${({ theme }) => theme.isDarkMode ? '#9CE00C' : '#5200FF'};
  text-decoration: none;
  font-family: "Source Serif 4", serif;
  font-size: 1rem;
  color: inherit;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => (theme.isDarkMode ? '#5200FF' : '#9CE00C')};
  }
`;

const ArticleImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 4px;
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArticleAuthor = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.isDarkMode ? '#ccc' : '#666'};
  margin-left: 1rem;
`;

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
    <EarlierArticlesWrapper theme={{ isDarkMode }}>
      <EarlierArticlesTitle>Earlier Articles</EarlierArticlesTitle>
      <EarlierArticlesList>
        {earlierArticles.map((article: Article) => (
          <EarlierArticleItem key={article.id}>
            <ArticleImage src={article.img} alt={article.header} />
            <ArticleInfo>
              <EarlierArticleLink to={`/article/${article.articleUrl}`} theme={{ isDarkMode }}>
                {article.header}
              </EarlierArticleLink>
              <ArticleAuthor theme={{ isDarkMode }}>By {article.author}</ArticleAuthor>
            </ArticleInfo>
          </EarlierArticleItem>
        ))}
      </EarlierArticlesList>
    </EarlierArticlesWrapper>
  );
};

export default EarlierArticles;