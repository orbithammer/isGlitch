import React from "react";
import styled from 'styled-components';
import PageMetaTags from "../utils/PagesMetaTags.tsx"

const StyledWrapper = styled.div`
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
`;

const ThankYouPage: React.FC = () => {
    return (
        <>
            <PageMetaTags />
            <StyledWrapper>
                <h1>Thank You!</h1>
                <p>Your message has been received. We'll get back to you as soon as possible.</p>
            </StyledWrapper>
        </>
    );
};

export default ThankYouPage;