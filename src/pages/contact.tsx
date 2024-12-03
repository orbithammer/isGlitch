import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <section className="contact-section">
            <form className="contact-form" onSubmit={onSubmit}>
                <div className="input-box">
                    <label htmlFor="name" className="form-label">First Name</label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Enter your first name"
                        name="name"
                        className="form-input"
                        required 
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="family-name" className="hidden">Family Name</label>
                    <input 
                        type="text"
                        id="family-name"
                        name="family-name"
                        placeholder="Enter your family name"
                        className="form-input hidden"
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        className="form-input"
                        required 
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea 
                        id="message"
                        placeholder="Enter your message"
                        name="message"
                        className="form-textarea"
                        required
                    ></textarea>
                </div>
                <button type="submit">Send</button>
                {error && <div className="error-message">{error}</div>}
            </form>
        </section>
    );
};

export default Contact;