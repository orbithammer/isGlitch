import React, {useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
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
}

const StyledHeroWrapper = styled.div`
    position: relative;
`

const StyledLogo = styled.p`
    font-weight: bold;
    font-style: normal;
    position: absolute; 
    font-size: 3rem;
    top: -5.3rem;
    text-shadow: ${({ theme }) => theme.isDarkMode ? "1px 1px 5px rgba(0, 0, 0,  0.5)" : "1px 1px 5px rgba(255, 255, 255,  0.5)"};
    left: -0.6rem;
    @media (min-width: 64rem) {
        font-size: 4rem;
        top: -7rem;
        left: -0.8rem;;
    } 
`

const StyledImg = styled.img`
    max-width: 100%;
    margin: 0;
    border-radius: 5px;
    object-fit: cover;
`
const StyledTagsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
`
const StyledTag = styled(Link)`
    color: ${({ theme }) => (theme.isDarkMode ? '#9CE00C' : '#5200FF')};
    text-decoration: none;
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ theme }) => (theme.isDarkMode ? '#5200FF' : '#9CE00C')};
        color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#000' )};
    }
`

const StyledHeadline = styled.h1`
    font-family: "Fjalla One", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 2.4rem;
    letter-spacing: -0.05em;
    max-width: 90%;
    word-spacing: -0.05em;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    @media (min-width: 64rem) {
        font-size: 3rem;
        line-height: 3.4rem;
    } 
`

const StyledSubhead = styled.h2`
    font-family: "Source Serif 4", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-size: 1.5rem;
    letter-spacing: -0.05em;
    word-spacing: -0.05em;
    margin: 0;
    line-height: 1.5rem;
    padding: 0 0.5rem;
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
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ theme }) => theme.isDarkMode ? "#5200FF" : "#9CE00C"};
    }
`

const StyledButtonWrapper = styled.div`
    display: flex;
`

const StyledShareButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.isDarkMode ? "#353535" : "#cacaca"};
    margin-right: 1rem;
    border: none;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${({ theme }) => theme.isDarkMode ? "#5200FF" : "#9CE00C"};
      }
    a {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
`

const StyledShareImgIcon = styled.img`
    width: 2rem;
    height: 2rem;
`

const StyledArticleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    @media (min-width: 64rem) {
        flex-direction: row;
    }
`;

const StyledArticleContent = styled.article`
    flex: 2;
    @media (min-width: 64rem) {
        margin-right: 2rem;
    } 
`;

const StyledSidebar = styled.aside`
    flex: 1;
`;

const StyledArticleBody = styled.p`
    font-family: "Quattrocento", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.2rem
`
const StyledCTAWrapper = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: inherit;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    border: 1px solid ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
    &:hover {
        background-color: ${({ theme }) => theme.isDarkMode ? "#5200FF" : "#9CE00C"};
    }
    @media (min-width: 64rem) {
        flex-direction: row;
    } 
`

const StyledCoffeeImg = styled.img`
    height: 7rem;
    filter: drop-shadow(3px 3px 2px ${({ theme }) => theme.isDarkMode ? "#fff" : "#000"});
    @media (min-width: 64rem) {
        height: 10rem;
    } 
`

const StyledCTA = styled(StyledArticleBody)`
    font-family: "Source Serif 4", serif; 
    font-style: italic;
    font-size: 1rem;
    margin: 0.5rem 1rem 1rem;
    text-align: center;
    @media (min-width: 64rem) {
        text-align: left;
    }
`

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

                // Get the 5 most recent article URLs
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
            <StyledTag key={index} theme={{ isDarkMode }} to={`/search/${tag}`}>
                {tag}
            </StyledTag>
        ));

        return (
            <>
                <MetaTags 
                    title={article.header}
                    description={article.subhead}
                    imageUrl={article.img}
                    url={window.location.href}
                />
                <main>
                    <StyledHeroWrapper>
                        <StyledLogo theme={{ isDarkMode }}>isGlitch.com</StyledLogo>
                        <StyledImg src={article.img} alt={article.alt}/>
                    </StyledHeroWrapper>
                    <StyledTagsWrapper>
                        {renderTags}
                    </StyledTagsWrapper>
                    <StyledHeadline>{article.header}<br/></StyledHeadline>
                    <StyledSubhead>{article.subhead}</StyledSubhead>
                    <StyledArticleInfo>
                        <StyledAuthor 
                            theme={{ isDarkMode }}
                            to={`/profiles#${article.author.replace(/\s+/g, '-').toLowerCase()}`}
                            aria-label={`to ${article.author}'s profile`}
                        >{article.author}</StyledAuthor>
                        {formattedDate}
                    </StyledArticleInfo>
                    <StyledButtonWrapper>
                        <StyledShareButton onClick={copyLink} theme={{ isDarkMode }}>
                            <StyledShareImgIcon src={isDarkMode ? CopyLinkIconDark : CopyLinkIconLight} alt="copy link icon" />
                        </StyledShareButton>
                        <StyledShareButton theme={{ isDarkMode }}>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://theglitchnews.netlify.app/article/${article.articleUrl}&quote=${article.header} | #theGlitch`} target="_blank" rel="noopener noreferrer">
                                <StyledShareImgIcon src={isDarkMode ? FacebookShareIconDark : FacebookShareIconLight} alt="facebook share icon"/>
                            </a>
                        </StyledShareButton>
                        <StyledShareButton theme={{ isDarkMode }}>
                            <a href={`https://twitter.com/share?text=${encodeURIComponent(article.header + " | #theGlitch #tech")}&url=${encodeURIComponent("https://theglitchnews.netlify.app/article/" + article.articleUrl)}`} target="_blank" rel="noopener noreferrer">
                                <StyledShareImgIcon src={isDarkMode ? TwitterShareIconDark : TwitterShareIconLight} alt="twitter share icon"/>
                            </a>
                        </StyledShareButton>
                    </StyledButtonWrapper>
                    <StyledArticleWrapper>
                        <StyledArticleContent>
                            {article.articleBody.map((paragraph, index) => (
                                <StyledArticleBody key={index}>{paragraph}</StyledArticleBody>
                            ))}
                            <StyledCTAWrapper href="https://buymeacoffee.com/isglitch" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
                                <StyledCoffeeImg src={BuyMeACoffeeIcon} alt="Buy Me a Coffee icon" theme={{ isDarkMode }}/>
                                <StyledCTA>
                                    I know people are hurting out there, but running this site isn't free. Help me keep isGlitch.com up and running. If this site has brightened your day, and you have five bucks to spare, please click the cup icon to Buy Me a Coffee! <br/ > Many thanks to those who do. 
                                </StyledCTA>
                            </StyledCTAWrapper>
                        </StyledArticleContent>
                        <StyledSidebar>
                            <MostRecentArticles currentArticleUrl={articleUrl} />
                            <EarlierArticles currentArticleUrl={articleUrl} recentArticleUrls={recentArticleUrls} />
                        </StyledSidebar>
                    </StyledArticleWrapper>
                    
                </main>
            </>
        );
    };

    return renderContent();
};

export default Article;