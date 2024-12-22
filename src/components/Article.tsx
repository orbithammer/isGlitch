import React, { useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { articlesData } from "../data/articles"
import MostRecentArticles from "./MostRecentArticles"
import EarlierArticles from "./EarlierArticles" 
import MetaTags from "../utils/MetaTags"
import CopyLinkIconDark from "/src/assets/copyLinkDark.svg"
import CopyLinkIconLight from "/src/assets/copyLinkLight.svg"
import FacebookShareIconDark from "/src/assets/facebookShareDark.svg"
import FacebookShareIconLight from "/src/assets/facebookShareLight.svg"
import TwitterShareIconDark from "/src/assets/twitterShareDark.svg"
import TwitterShareIconLight from "/src/assets/twitterShareLight.svg"
import BuyMeACoffeeIcon from "/src/assets/buyMeACoffee.svg"
import SocialLinks from './SocialLinks';
import ThemeContext from "../utils/ThemeContext"
import formatDate from "../utils/formatDate"

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
    articleBody: string[];
    tags?: string[];
}

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    } catch (err) {
        console.error(err);
        alert('Failed to copy link to clipboard!');
    }
}

const Article: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const { articleUrl } = useParams<{ articleUrl: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [recentArticleUrls, setRecentArticleUrls] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = () => {
            setIsLoading(true);
            const foundArticle = articlesData.find(articleObj => articleObj.articleUrl === articleUrl);
            if (foundArticle) {
                setArticle(foundArticle);
                setTags(foundArticle.tags || []);
                setIsLoading(false);

                const recentUrls = articlesData
                    .filter(a => a.articleUrl !== articleUrl)
                    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
                    .slice(0, 5)
                    .map(a => a.articleUrl);
                setRecentArticleUrls(recentUrls);
            } else {
                setIsLoading(false);
                navigate('/not-found');
            }
        };
        fetchArticle();
    }, [articleUrl, navigate]);

    useEffect(() => {
        if (!article && !isLoading) {
            navigate('not-found');
        }
    }, [article, isLoading, navigate]);

    const renderContent = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!article) {
            return null;
        }

        const formattedDate = formatDate(article.datePublished);

        const renderTags = tags.map((tag, index) => (
            <Link key={index} className="tag" to={`/search/${tag}`}>
                {tag}
            </Link>
        ));

        return (
            <>
                <MetaTags 
                    title={article.header}
                    description={article.subhead}
                    imageUrl={`${window.location.origin}${article.img}`}
                    url={window.location.href}
                />
                <main>
                    <div className="hero-wrapper">
                        <p className="hero-logo">isGlitch.com</p>
                        <img className="hero-image" src={article.img} alt={article.alt} />
                    </div>
                    <div className="tags-wrapper">
                        {renderTags}
                    </div>
                    <h1 className="headline">{article.header}</h1>
                    <h2 className="subhead">{article.subhead}</h2>
                    <p className="article-info">
                        <Link 
                            className="author-link"
                            to={`/profiles#${article.author.replace(/\s+/g, '-').toLowerCase()}`}
                            aria-label={`to ${article.author}'s profile`}
                        >
                            {article.author}
                        </Link>
                        {formattedDate}
                    </p>
                    <div className="button-wrapper">
                        <button className="share-button" onClick={copyLink}>
                            <img 
                                className="share-icon" 
                                src={isDarkMode ? CopyLinkIconDark : CopyLinkIconLight} 
                                alt="copy link icon" 
                            />
                        </button>
                        <button className="share-button">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://isGlitch/article/${article.articleUrl}&quote=${article.header} | #theGlitch`} 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <img 
                                    className="share-icon"
                                    src={isDarkMode ? FacebookShareIconDark : FacebookShareIconLight} 
                                    alt="facebook share icon"
                                />
                            </a>
                        </button>
                        <button className="share-button">
                            <a href={`https://twitter.com/share?text=${encodeURIComponent(article.header + " | #theGlitch #tech")}&url=${encodeURIComponent("https://theglitchnews.netlify.app/article/" + article.articleUrl)}`} 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <img 
                                    className="share-icon"
                                    src={isDarkMode ? TwitterShareIconDark : TwitterShareIconLight} 
                                    alt="twitter share icon"
                                />
                            </a>
                        </button>
                    </div>
                    <div className="article-wrapper">
                        <article className="article-content">
                            {article.articleBody.map((paragraph, index) => (
                                <p key={index} className="article-body">
                                    {paragraph.split(/(\[[^\]]+\]\([^\)]+\))/).map((text, i) => {
                                        const linkMatch = text.match(/\[([^\]]+)\]\(([^\)]+)\)/);
                                        if (linkMatch) {
                                            return (
                                                <a 
                                                    key={i}
                                                    href={linkMatch[2]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="clickable-link"
                                                >
                                                    {linkMatch[1]}
                                                </a>
                                            );
                                        }
                                        return text;
                                    })}
                                </p>
                            ))}
                            <a 
                                className="cta-wrapper"
                                href="https://buymeacoffee.com/isglitch" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <img 
                                    className="coffee-img"
                                    src={BuyMeACoffeeIcon} 
                                    alt="Buy Me a Coffee icon" 
                                />
                                <p className="cta-text">
                                    Support isGlitch.com and buy me a coffee! 
                                </p>
                            </a>
                            <SocialLinks />
                        </article>
                        <aside className="sidebar">
                            <MostRecentArticles currentArticleUrl={articleUrl} />
                            <EarlierArticles currentArticleUrl={articleUrl} recentArticleUrls={recentArticleUrls} />
                        </aside>
                    </div>
                </main>
            </>
        );
    };

    return renderContent();
};

export default Article;