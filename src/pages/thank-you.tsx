import React from "react";
import PageMetaTags from "../utils/PagesMetaTags.tsx"

const ThankYouPage: React.FC = () => {
    return (
        <>
            <PageMetaTags />
            <div className="thank-you-wrapper">
                <h1>Thank You!</h1>
                <p>Your message has been received. We'll get back to you as soon as possible.</p>
            </div>
        </>
    );
};

export default ThankYouPage;