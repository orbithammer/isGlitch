import React from "react";
import { Link } from "react-router-dom"
import { styled } from "styled-components"
import notFound from "/images/notFound.webp"
import PageMetaTags from "../utils/PagesMetaTags.tsx"

const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    border-radius: 5px;
`

const NotFoundPage: React.FC = () => {
    return (
        <>
            <PageMetaTags />
            <main>
                <StyledLink to="/">
                    <h1>Page not found</h1>
                    <img src={notFound} alt="man with face half hidden behind a desk with 404 written underneath" />
                    <p>Click the image to go back home</p>
                </StyledLink>
            </main>
        </>
    )
}

export default NotFoundPage