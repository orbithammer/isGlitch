import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { articlesData } from '../data/articles';
import ThemeContext from "../utils/ThemeContext"

// Define the type for an individual article
type Article = {
  id: number;
  articleUrl: string;
  header: string;
  datePublished: Date;
  img: string;
  author: string;
  // Add other properties as needed
};

// Define props for the MostRecentArticles component
type MostRecentArticlesProps = {
  currentArticleUrl: string | undefined;
}

const RecentArticlesWrapper = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
`;

const RecentArticlesTitle = styled.h3`
  font-family: "Fjalla One", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const RecentArticlesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RecentArticleItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const RecentArticleLink = styled(Link)`
  color: ${({ theme }) => theme.isDarkMode ? '#9CE00C' : '#5200FF'};
  text-decoration: none;
  font-family: "Source Serif 4", serif;
  font-size: 1rem;
  color: inherit;
  &:hover {
    text-decoration: underline;
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
`;

const MostRecentArticles: React.FC<MostRecentArticlesProps> = ({ currentArticleUrl }) => {
  const { isDarkMode } = useContext(ThemeContext)
  const recentArticles = articlesData
    .filter((article: Article) => article.articleUrl !== currentArticleUrl)
    .sort((a: Article, b: Article) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 5);

  return (
    <RecentArticlesWrapper theme={{ isDarkMode }}>
      <RecentArticlesTitle>Most Recent Articles</RecentArticlesTitle>
      <RecentArticlesList>
        {recentArticles.map((article: Article) => (
          <RecentArticleItem key={article.id}>
            <ArticleImage src={article.img} alt={article.header} />
            <ArticleInfo>
              <RecentArticleLink to={`/article/${article.articleUrl}`}>
                {article.header}
              </RecentArticleLink>
              <ArticleAuthor theme={{ isDarkMode }}>By {article.author}</ArticleAuthor>
            </ArticleInfo>
          </RecentArticleItem>
        ))}
      </RecentArticlesList>
    </RecentArticlesWrapper>
  );
};

export default MostRecentArticles;