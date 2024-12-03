import React from "react";
import { Link } from "react-router-dom"
import notFound from "/images/notFound.webp"
import PageMetaTags from "../utils/PagesMetaTags.tsx"

const NotFoundPage: React.FC = () => {
    return (
        <>
            <PageMetaTags />
            <main>
                <Link to="/" className="not-found-link">
                    <h1>Page not found</h1>
                    <img src={notFound} alt="man with face half hidden behind a desk with 404 written underneath" />
                    <p>Click the image to go back home</p>
                </Link>
            </main>
        </>
    );
};

export default NotFoundPage;