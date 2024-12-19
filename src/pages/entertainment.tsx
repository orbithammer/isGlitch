import React, {useState, useEffect, useContext} from "react"
import { Link, useParams } from "react-router-dom"
import { articlesData } from "../data/articles.ts"
import Pagination from "../components/Pagination.tsx"
import ThemeContext from "../utils/ThemeContext"
import formatDate from "../utils/formatDate.tsx"
import navigateToNotFound from "../utils/navigateToNotFound.tsx"
import PageMetaTags from "../utils/PagesMetaTags.tsx"

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

const EntertainmentPage: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const entertainmentArticles = articleData
        .filter((article) => article.category === "entertainment")
        .sort((a, b) => b.datePublished.getTime() - a.datePublished.getTime());
    const { pageNumber } = useParams();
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber || '1', 10))
    const articlesPerPage = 6
    const startIndex = (currentPage - 1) * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const currentArticles = entertainmentArticles.slice(startIndex, endIndex)
    const totalArticles = entertainmentArticles.length
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
                currentSubPagePath="/entertainment"
                onOlderPage={handleOlderPage}
                onNewerPage={handleNewerPage}
            />
            <main className={isDarkMode ? 'dark' : 'light'}>
                {currentArticles.map((article, index) => {
                    return (
                        <article key={article.id}>
                            <Link 
                                to={`/article/${article.articleUrl}`}
                                aria-label={`to article ${article.header}`}
                                className="article-link"
                            >
                                <div className="image-wrapper">
                                    {index === 0 && <h1 className="site-logo">isGlitch.com</h1>}
                                    <img className="featured-image" src={article.img} alt={article.alt}/>
                                </div>
                                {index === 0 ? (
                                    <>
                                        <h2 className="headline">{article.header}<br /></h2>
                                        <p className="subhead">{article.subhead}</p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="headline-small">{article.header}<br /></h2>
                                        <p className="subhead-small">{article.subhead}</p>
                                    </>
                                )}
                            </Link>
                            <p className="article-info">
                                <Link 
                                    className="author-link"
                                    to={`/profiles#${article.author.replace(/\s+/g, '-').toLowerCase()}`}
                                    aria-label={`to ${article.author}'s profile`}
                                >
                                    {article.author}
                                </Link>
                                {formatDate(article.datePublished)}
                            </p>
                        </article>
                    )
                })}
            </main>
            {currentArticles.length > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    currentSubPagePath="/entertainment"
                    onOlderPage={handleOlderPage}
                    onNewerPage={handleNewerPage}
                />
            )}
        </>
    );
};

export default EntertainmentPage;