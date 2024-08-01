import React, { useContext, useEffect, useState, useRef, RefObject } from 'react';
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
    sidebarRef: RefObject<HTMLDivElement>;
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
`;

const EarlierArticles: React.FC<EarlierArticlesProps> = ({ currentArticleUrl, recentArticleUrls, sidebarRef }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const [earlierArticles, setEarlierArticles] = useState<Article[]>([]);
    const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
  
    useEffect(() => {
      const excludedUrls = [currentArticleUrl, ...recentArticleUrls];
      const filteredArticles = articlesData.filter(
        (article: Article) => !excludedUrls.includes(article.articleUrl)
      );
      
      const shuffledArticles = [...filteredArticles].sort(() => 0.5 - Math.random());
      
      setEarlierArticles(shuffledArticles);
    }, [currentArticleUrl, recentArticleUrls]);
  
    useEffect(() => {
      const updateVisibleArticles = () => {
        if (sidebarRef.current && wrapperRef.current && listRef.current) {
          const sidebarHeight = sidebarRef.current.clientHeight;
          const mostRecentArticlesHeight = (sidebarRef.current.firstChild as HTMLElement)?.clientHeight || 0;
          const wrapperHeight = wrapperRef.current.clientHeight;
          const titleHeight = (wrapperRef.current.querySelector('h3') as HTMLElement)?.clientHeight || 0;
          const availableHeight = sidebarHeight - mostRecentArticlesHeight - wrapperHeight + titleHeight - 32; // 32px for padding
  
          let totalHeight = 0;
          const visibleArticles: Article[] = [];
  
          for (const article of earlierArticles) {
            const dummyItem = document.createElement('li');
            dummyItem.style.visibility = 'hidden';
            dummyItem.innerHTML = `
              <div style="display: flex; align-items: center;">
                <img style="width: 50px; height: 50px; margin-right: 1rem;" />
                <div>
                  <div>${article.header}</div>
                  <span>By ${article.author}</span>
                </div>
              </div>
            `;
            listRef.current.appendChild(dummyItem);
            const itemHeight = dummyItem.offsetHeight;
            listRef.current.removeChild(dummyItem);
  
            if (totalHeight + itemHeight <= availableHeight) {
              totalHeight += itemHeight;
              visibleArticles.push(article);
            } else {
              break;
            }
          }
  
          setVisibleArticles(visibleArticles);
        }
      };
  
      updateVisibleArticles();
      window.addEventListener('resize', updateVisibleArticles);
  
      return () => {
        window.removeEventListener('resize', updateVisibleArticles);
      };
    }, [earlierArticles, sidebarRef]);
  
    if (visibleArticles.length === 0) {
      return null;
    }
  
    return (
      <EarlierArticlesWrapper ref={wrapperRef} theme={{ isDarkMode }}>
        <EarlierArticlesTitle>Earlier Articles</EarlierArticlesTitle>
        <EarlierArticlesList ref={listRef}>
          {visibleArticles.map((article: Article) => (
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
  