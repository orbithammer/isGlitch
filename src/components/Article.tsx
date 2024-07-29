import React, {useEffect, useState, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { articlesData } from "../data/articles"
import { styled } from "styled-components"
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

type articlesData = {
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

const StyledArticleBody = styled.p`
    font-family: "Quattrocento", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.2rem
`
const StyledCTAWrapper = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
`

const StyledCoffeeImg = styled.img`
    height: 5rem;
    filter: drop-shadow(3px 3px 2px ${({ theme }) => theme.isDarkMode ? "#fff" : "#000"});
    @media (min-width: 64rem) {
        height: 10rem;
    } 
`

const StyledCTA = styled(StyledArticleBody)`
    font-family: "Source Serif 4", serif; 
    font-style: italic;
    font-size: 1rem;
    margin: 1.5rem 3rem 1.5rem 0;
`

// const StyledLemmyButton = styled.button`
//     font-family: "Quattrocento", serif;
//     font-weight: 400;
//     font-style: normal;
// `
// const StyledLemmyAnchor = styled.a`
//     text-decoration: none;
// `

const copyLink = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    } catch (err) {
        console.error(err);
        alert('Failed to copy link to clipboard!');
    }
}

const copyLemmy = async () => {
    try {
        await navigator.clipboard.writeText("!isglitch@lemmy.world");
        alert('!isglitch@lemmy.world copied to clipboard!');
    } catch (err) {
        console.error(err);
        alert('Failed to copy link to clipboard!');
    }
}

const Article: React.FC = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const {articleUrl} = useParams() 
    const [article, setArticle] = useState<articlesData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [tags, setTags] = useState<string[]>([]);
    useEffect(()=>{
        const foundArticle = articlesData.find(articleObj => articleObj.articleUrl === articleUrl);
        setArticle(foundArticle ? foundArticle : null);
        setTags(foundArticle ? foundArticle.tags : []);
        setIsLoading(false)
    },[])
    const renderTags = tags.map((tag, index) => (
        <StyledTag key={index} theme={{ isDarkMode }} to={`/search/${tag}`}>
            {tag}
        </StyledTag>
    ));
    const navigate = useNavigate()
    let formattedDate = ""
    if(article){
        formattedDate = formatDate(article.datePublished)
    }
    useEffect(()=>{
        if(!article && !isLoading) {
            navigate('not-found')
        }
    }, [isLoading])

    return (
        <>
            <MetaTags 
                title={article?.header || ""}
                description={article?.subhead || ""}
                imageUrl={article?.img || ""}
                url={window.location.href}
            />
            <main>
                <StyledHeroWrapper>
                    <StyledLogo theme={{ isDarkMode }}>isGlitch.com</StyledLogo>
                    <StyledImg src={article?.img} alt={article?.alt}/>
                </StyledHeroWrapper>
                <StyledTagsWrapper>
                    {renderTags}
                </StyledTagsWrapper>
                <StyledHeadline>{article?.header}<br/></StyledHeadline>
                <StyledSubhead>{article?.subhead}</StyledSubhead>
                <StyledArticleInfo>
                    <StyledAuthor 
                        theme={{ isDarkMode }}
                        to={`/profiles#${article?.author.replace(/\s+/g, '-').toLowerCase()}`}
                        aria-label={`to ${article?.author}'s profile`}
                    >{article?.author}</StyledAuthor>
                    {formattedDate}
                </StyledArticleInfo>
                <StyledButtonWrapper>
                    <StyledShareButton onClick={copyLink} theme={{ isDarkMode }}>
                        <StyledShareImgIcon src={isDarkMode ? CopyLinkIconDark : CopyLinkIconLight} alt="copy link icon" />
                    </StyledShareButton>
                    <StyledShareButton theme={{ isDarkMode }}>
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=https://theglitchnews.netlify.app/article/${article?.articleUrl}&quote=${article?.header} | #theGlitch`} target="_blank" rel="noopener noreferrer">
                            <StyledShareImgIcon src={isDarkMode ? FacebookShareIconDark : FacebookShareIconLight} alt="facebook share icon"/>
                        </a>
                    </StyledShareButton>
                    <StyledShareButton theme={{ isDarkMode }}>
                        <a href={`https://twitter.com/share?text=${encodeURIComponent(article?.header + " | #theGlitch #tech")}&url=${encodeURIComponent("https://theglitchnews.netlify.app/article/" + article?.articleUrl)}`} target="_blank" rel="noopener noreferrer">
                            <StyledShareImgIcon src={isDarkMode ? TwitterShareIconDark : TwitterShareIconLight} alt="twitter share icon"/>
                        </a>
                    </StyledShareButton>
                </StyledButtonWrapper>
                <article>
                    {article?.articleBody.map((paragraph, index)=><StyledArticleBody key={index}>{paragraph}</StyledArticleBody>)}
                </article>
                <StyledCTAWrapper href="https://buymeacoffee.com/isglitch" target="_blank" rel="noopener noreferrer">
                    <StyledCoffeeImg src={BuyMeACoffeeIcon} theme={{ isDarkMode }}/>
                    <StyledCTA>
                        Support independent creators! Click the icon to Buy Me a Coffee and help keep isGlitch.com free from big tech's influence.
                    </StyledCTA>
                </StyledCTAWrapper>
            </main>
        </>
    )
}

export default Article

/*Tired of the vice-like grip of big tech on mainstream social media? Come to Lemmy.world to join the isGlitch.com community! Already have a Lemmy or fediverse account? Great. Paste 
                            <StyledLemmyButton onClick={copyLemmy}>!isglitch@lemmy.world</StyledLemmyButton>
                        into the search bar of your instance of choice or visit the link 
                            <StyledLemmyButton>
                                <StyledLemmyAnchor href="https://lemmy.world/c/isglitch" target="_blank" rel="noopener noreferrer">here</StyledLemmyAnchor>
                            </StyledLemmyButton>
                        . Otherwise, feel free to sign up at your friendly neighborhood Lemmy instance.*/