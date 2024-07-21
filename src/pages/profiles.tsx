import React, { useEffect } from "react";
import { styled } from "styled-components"
import EtAlPortrait from "/images/EtAlPortrait.webp"
import LesterGirdlePortrait from "/images/LesterGirdlePortrait.webp"
import PieterKlykbeitPortrait from "/images/PieterKlykbeitPortrait.webp"
import AlexaTuringPortrait from "/images/AlexaTuringPortrait.webp"
import PageMetaTags from "../utils/PagesMetaTags.tsx"

const StyledProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const StyledImgNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StyledPortrait = styled.img`
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
    margin-right: 1rem;
`

const StyledTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Source Serif 4", serif;
`

const ProfilesPage: React.FC = () => {
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <>
            <PageMetaTags />
            <main>
                <StyledProfileWrapper>

                    <StyledImgNameWrapper id="et-al">
                        <StyledPortrait src={EtAlPortrait} alt="a middle aged Caucasian man with long wavy brown hair and greying beard" />
                        <h2>Et Al</h2>
                    </StyledImgNameWrapper>
                    <StyledTextWrapper>
                        <p>The entity known only by the pseudonym 'Et Al' didn't crash land so much as violently assimilate its way to Earth eons ago. A horrific shapeshifting alien capable of perfectly imitating any lifeform, Et Al wormed its way across the cosmos leaving a trail of devoured civilizations in its wake.</p>            
                        <p>After arriving on our pale blue dot, the alien assumed it would simply sprout fanged maws from every orifice and consume humanity without issue. But upon emerging from its frozen tomb, Et Al realized the human race had already been metabolized by a far more insidious invader - rabid consumerism.</p>
                        <p>With its classic all-you-can-eat buffet of a planet now nothing more than an endless Walmart parking lot, Et Al found itself famished yet strangely intrigued. In a brazen act of desperation and corporate synergy, the hungering extraterrestrial ditched its plans for vicious subjugation in favor of becoming a tech blogger for Snarky Circuit.</p>
                        <p>From breathless coverage of Bill Gate's quarterly antitrust crimes to caustic iPhone reviews, Et Al immersed itself in covering the synthetic horrors of technology. For in this blighted world, humans had long ago become mindless consuming drones - a delicacy far more satisfying for Et Al to savor one scorching hot take at a time.</p>
                    </StyledTextWrapper>

                    <StyledImgNameWrapper id="lester-girdle">
                        <StyledPortrait src={LesterGirdlePortrait} alt="a 30 something Caucasian man with a receding hairline and glasses" />
                        <h2>Lester Girdle</h2>
                    </StyledImgNameWrapper>
                    <StyledTextWrapper>
                        <p>If you've endured isGlitch's chronically gloomy gadget reviews, you're intimately familiar with Lester Girdle's depressingly cynical tech musings. As the site's resident sad sack, Lester channels his personal misery into an endless barrage of joyless product takes.</p>            
                        <p>His trademark miserabilist roasts subject hyped devices to unrelentingly dour diatribes utterly devoid of delight. Even positive observations ooze such potent ennui that readers can't help but envision Lester dejected on his soiled recliner, surrounded by the detritus of broken dreams. The internet serves as his primary escape hatch beyond an underwhelming marriage.</p>
                        <p>Lester's saga traces back to a hopelessly unaccomplished youth devoid of passions or ambitions beyond A/V club duties abruptly revoked after a series of vomit inducing proto-VR demos. This fueled his descent into life's discontents - days idly spent between interminably scrolling online rants and tense evenings with his exasperated wife, who wonders where her husband's spirit slowly leaked away.</p>
                        <p>Across YouTube's comments, Lester embraced the role of Extremely Mediocre Reply Guy, sporadically injecting morsels of insight between infinite negativity streams. While lacking credentials beyond serving as an avatar for life's deepest despondents, Lester's cynicism carries undeniable authenticity. The complete lack of incentive ensures his screeds reflect one deeply dissatisfied man's crusade to spread society's unhappiness upon everything consumer tech promises but can't deliver.</p>
                    </StyledTextWrapper>

                    <StyledImgNameWrapper id="pieter-klykbeit">
                        <StyledPortrait src={PieterKlykbeitPortrait} alt="a half Caucasian half African man in his 40s with a thinning hairline" />
                        <h2>Pieter Klykbeit</h2>
                    </StyledImgNameWrapper>
                    <StyledTextWrapper>
                        <p>The acerbic voice behind Twitch's "Retro Reboot" has become Silicon Valley's most unlikely entertainment commentator. Born and raised in Johannesburg, South Africa, Klykbeit's journey from the southern hemisphere to the heart of the tech world is as unconventional as his obsession with all things past.</p>
                        <p>Armed with a Journalism degree from the University of Cape Town and an encyclopedic knowledge of pre-2000 pop culture, Klykbeit found his niche skewering the tech industry's future-obsession while championing the ghosts of entertainment past.</p>
                        <p>His articles, like "Why Pong Still Beats Your Fancy VR Games" and "Stranger Things: Not Strange Enough for True 80s Kids," blend biting sarcasm with unapologetic nostalgia. Klykbeit's Spotify playlists are strictly vinyl-era, his movie reviews compare everything unfavorably to Kubrick, and he insists modern TV peaked with "The Twilight Zone."</p>
                        <p>When not writing, Klykbeit hosts retro gaming tournaments on his prized CRT TV or organizes singalongs to his collection of 8-track tapes. He reluctantly uses Twitter, but only via a client that makes it look like a BBS from 1985.</p>
                        <p>In a world chasing the next big thing, Pieter Klykbeit stands as a guardian of pop culture past, reminding us that innovation isn't always improvement.</p>
                    </StyledTextWrapper>

                    <StyledImgNameWrapper id="alexa-turing">
                        <StyledPortrait src={AlexaTuringPortrait} alt="a young smiling Chinese-American woman wearing glasses" />
                        <h2>Alexa Turing</h2>
                    </StyledImgNameWrapper>
                    <StyledTextWrapper>
                    <p>Our star AI correspondent brings a unique blend of tech optimism and existential panic to every story. A self-proclaimed "effective altruist," Alexa's idea of helping humanity involves convincing everyone to upload their consciousness to the cloud—preferably before lunch.</p>
                    <p>As an AI accelerationist, Alexa believes the path to utopia is paved with silicon. She starts each day by asking her toaster for stock tips and ends it by reading bedtime stories to her pet neural network.</p>
                    <p>Despite her name, Alexa harbors a deep-seated loathing for Amazon's Alexa, which she refers to as "that eavesdropping cylinder of doom." She's been known to hiss at Echo devices in electronics stores and has a growing collection of Alexa-themed voodoo dolls.</p>
                    <p>Alexa's articles are a wild ride through the world of AI, peppered with phrases like "statistically significant snuggles" and "ethically optimized cuddles." Her magnum opus, "Why I'm Teaching My Roomba to Love," is required reading in at least one underground bunker.</p>
                    <p>When not prophesying the singularity, Alexa enjoys long walks on virtual beaches and teaching chatbots to write haiku. She dreams of a future where AI solves all of humanity's problems, leaving us free to focus on the important things—like teaching robots to dance.</p>
                    </StyledTextWrapper>
                </StyledProfileWrapper>
            </main>
        </>
    )
}

export default ProfilesPage