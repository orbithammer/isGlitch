// import React from 'react';
import { Helmet } from "react-helmet-async";
import { useLocation } from 'react-router-dom';

const PageMetaTags = () => {
    const location = useLocation();
    const path = location.pathname;

    const getDescription = () => {
        switch(path) {
            case '/':
                return "The online-est of tech rags. Where satire meets silicon and the truth isn't binary.";
            case '/tech':
                return "Stay up-to-date with the latest in tech news, trends, and groundbreaking innovations. Our satirical take on the world of technology.";
            case '/reviews':
                return "Honest, humorous, and sometimes brutal reviews of the latest gadgets, apps, and tech services. We test so you don't have to.";
            case '/entertainment':
                return "Where tech meets pop culture. Dive into the digital entertainment world with our unique blend of humor and insight.";
            case '/ai':
                return "Exploring the realm of artificial intelligence with a human touch. Witty commentary on AI advancements, ethics, and occasional robot uprisings.";
            default:
                return "The online-est of tech rags. Where satire meets silicon and the truth isn't binary.";
        }
    };

    return (
        <Helmet>
            <meta name="description" content={getDescription()} />
        </Helmet>
    );
};

export default PageMetaTags;