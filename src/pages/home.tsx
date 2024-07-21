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
/*
const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.isDarkMode ? "#ffffff" : "#000000"};
    padding: 0 auto;
`

const StyledImageWrapper = styled.div`
    position: relative;
    margin: 0 auto;
`

const StyledLogo = styled.h1`
    position: absolute; 
    font-size: 3rem;
    text-shadow: ${({ theme }) => theme.isDarkMode ? "1px 1px 5px rgba(0, 0, 0,  0.5)" : "1px 1px 5px rgba(255, 255, 255,  0.5)"};
    top: -4.6rem;
    left: -0.6rem;
    @media (min-width: 64rem) {
        font-size: 4rem;
        top: -6.3rem;
        left: -0.8rem;;
    }
`

const StyledImg = styled.img`
    max-width: 100%;
    margin: 0;
    border-radius: 5px;
    object-fit: cover;
`

const StyledHeadline = styled.h2`
    font-family: "Fjalla One", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 2.4rem;
    letter-spacing: -0.05em;
    max-width: 90%;
    word-spacing: -0.05em;
    line-height: 3rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ theme }) => theme.isDarkMode ? "#5200FF" : "#9CE00C"};
    }
    margin: 0 0 0.5rem;
    @media (min-width: 64rem) {
        font-size: 3rem;
        line-height: 3.4rem;
    }
`

const StyledSubhead = styled.p`
    font-family: "Source Serif 4", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
    letter-spacing: -0.05em;
    word-spacing: -0.05em;
    margin: 0;
    padding: 0 1rem;
    line-height: 1.6rem;
`

const StyledHeadlineSmall = styled(StyledHeadline)`
  font-size: 2rem;
  line-height: 2.5rem;
  @media (min-width: 64rem) {
    font-size: 2.4rem;
  }
`

const StyledSubheadSmall = styled(StyledSubhead)`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.02em;
  @media (min-width: 64rem) {
    font-size: 1.2rem;
    line-height: 1.4rem;
  }
`

const StyledArticleInfo = styled.p`
    font-family: "Open Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    font-variation-settings:
        "wdth" 100;
        text-transform: uppercase;
`

const StyledAuthor = styled(Link)`
    color: ${({ theme }) => theme.isDarkMode ? "#9CE00C" : "#5200FF"};
    margin-right: 1rem;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ theme }) => theme.isDarkMode ? "#5200FF" : "#9CE00C"};
    }
`*/
const HomePage: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const allArticles = articleData.sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime());
    const { pageNumber } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || '1', 10))
    const articlesPerPage = 6
    const startIndex = (currentPage - 1) * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const currentArticles = allArticles.slice(startIndex, endIndex)
    const totalArticles = allArticles.length
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
                currentSubPagePath=""
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
                currentSubPagePath=""
                onOlderPage={handleOlderPage}
                onNewerPage={handleNewerPage}
                />
            )}
        </>
    )
}
export default HomePage
