import React, { FormEvent, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledForm = styled.form`
    max-width: 600px;
    width: 100%;
    padding: 1.5rem 1.5rem 1.8rem;
`;

const StyledInputBox = styled.div`
    margin-top: 1.25rem;
`;

const StyledInput = styled.input`
    width: 100%;
    height: 1.5rem;
    padding: 0.2rem;
    font-size: 1rem;
    margin-top: 0.4rem;
`;

const StyledTextarea = styled(StyledInput)`
    height: 3rem;
    margin: 0.4rem 0 1rem;
`;

const StyledErrorMessage = styled.div`
    color: red;
    margin-top: 1rem;
`;

const Contact: React.FC = () => {
    const contactFormKey = import.meta.env.VITE_CONTACT_FORM_KEY;
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        const formData = new FormData(event.currentTarget);
    
        formData.append("access_key", contactFormKey);

        if (formData.get('family-name')) {
            return;
          }
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });

            const res = await response.json();
    
            if (res.success) {
                console.log("Success", res);
                navigate("/thank-you");
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <StyledSection>
            <StyledForm onSubmit={onSubmit}>
                <StyledInputBox>
                    <label htmlFor="name">First Name</label>
                    <StyledInput type="text" id="name" placeholder="Enter your first name" name="name" required />
                </StyledInputBox>
                <StyledInputBox>
                    <label htmlFor="family-name" style={{display: 'none'}}>Family Name</label>
                    <StyledInput type="text" id="family-name" name="family-name" placeholder="Enter your family name" style={{display: 'none'}} />
                </StyledInputBox>
                <StyledInputBox className="input-box">
                    <label htmlFor="email">Email Address</label>
                    <StyledInput type="email" id="email"  placeholder="Enter your email" name="email" required />
                </StyledInputBox>
                <StyledInputBox className="input-box">
                    <label htmlFor="message">Your Message</label>
                    <StyledTextarea id="message" placeholder="Enter your message" name="message" required></StyledTextarea>
                </StyledInputBox>
                <button type="submit">Send</button>
                {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
            </StyledForm>
        </StyledSection>
    );
};

export default Contact;