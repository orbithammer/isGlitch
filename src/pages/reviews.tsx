import React, {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom"
import { articlesData } from "../data/articles.ts"
import Pagination from "../components/Pagination.tsx"
import ThemeContext from "../utils/ThemeContext"
import formatDate from "../utils/formatDate.tsx"
import navigateToNotFound from "../utils/navigateToNotFound.tsx"
import PageMetaTags from "../utils/PagesMetaTags.tsx"
import {
    StyledLink,
    StyledImageWrapper,
    StyledLogo,
    StyledImg,
    StyledHeadline,
    StyledSubhead,
    StyledHeadlineSmall,
    StyledSubheadSmall,
    StyledArticleInfo,
    StyledAuthor
  } from "../components/SharedStyledComponents.tsx"

type Article = {
    id: number;
    articleUrl: string;
    category: string;
    img: string;
    alt: string;
    header: string;
    subhead: string;
    author: string;
    datePublished: Date;
}

const articleData: Article[] = articlesData

const ReviewsPage: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const reviewsArticles = articleData
        .filter((article) => article.category === "reviews")
        .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime());
    const { pageNumber } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || '1', 10))
    const articlesPerPage = 6
    const startIndex = (currentPage - 1) * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const currentArticles = reviewsArticles.slice(startIndex, endIndex)
    const totalArticles = reviewsArticles.length
    const totalPages = Math.ceil(totalArticles / articlesPerPage)
    navigateToNotFound(pageNumber, totalPages)

    useEffect(() => {
        setCurrentPage(parseInt(pageNumber || '1', 10))
    }, [pageNumber])
    
    const handleOlderPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    const handleNewerPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)) 
    }

    return (
        <>
            <PageMetaTags />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                currentSubPagePath="/reviews"
                onOlderPage={handleOlderPage}
                onNewerPage={handleNewerPage}
            />
            <main>
                {currentArticles.map((article, index) => {
                    return (
                        <article key={article.id}>
                            <StyledLink 
                                to={`/article/${article.articleUrl}`}
                                aria-label={`to article ${article.header}`}
                                theme={{ isDarkMode }}
                            >
                                <StyledImageWrapper>
                                    {index === 0 && <StyledLogo theme={{ isDarkMode }}>isGlitch.com</StyledLogo>}
                                    <StyledImg src={article.img} alt={article.alt}/>
                                </StyledImageWrapper>
                                {index === 0 ? (
                                    <>
                                        <StyledHeadline theme={{ isDarkMode }}>{article.header}<br /></StyledHeadline>
                                        <StyledSubhead>{article.subhead}</StyledSubhead>
                                    </>
                                    ) : (
                                    <>
                                        <StyledHeadlineSmall theme={{ isDarkMode }}>{article.header}<br /></StyledHeadlineSmall>
                                        <StyledSubheadSmall>{article.subhead}</StyledSubheadSmall>
                                    </>
                                )}
                            </StyledLink>
                            <StyledArticleInfo>
                                <StyledAuthor 
                                    theme={{ isDarkMode }}
                                    to={`/profiles#${article.author.replace(/\s+/g, '-').toLowerCase()}`}
                                    aria-label={`to ${article.author}'s profile`}
                                >{article.author}</StyledAuthor>
                                {formatDate(article.datePublished)}
                            </StyledArticleInfo>
                        </article>
                    )
                })}
            </main>
            {currentArticles.length > 1 && (
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                currentSubPagePath="/reviews"
                onOlderPage={handleOlderPage}
                onNewerPage={handleNewerPage}
                />
            )}
        </>
    )
}
export default ReviewsPage
