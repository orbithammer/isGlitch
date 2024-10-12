import { useContext } from 'react';
import { styled } from 'styled-components';
import LemmyDark from '/src/assets/lemmyDark.svg';
import LemmyLight from '/src/assets/lemmyLight.svg';
import MastodonLight from '/src/assets/mastodonLight.svg';
import MastodonDark from '/src/assets/mastodonDark.svg';
import TwitterLight from '/src/assets/twitterLight.svg';
import TwitterDark from '/src/assets/twitterDark.svg';
import FacebookDark from "/src/assets/facebookShareDark.svg"
import FacebookLight from "/src/assets/facebookShareLight.svg"
import BlueSkyDark from "/src/assets/blueSkyDark.svg"
import BlueSkyLight from "/src/assets/blueSkyLight.svg"
import ThreadsLight from "/src/assets/threadsLight.svg"
import ThreadsDark from "/src/assets/threadsDark.svg"
import PinterestLight from "/src/assets/pinterestLight.svg"
import PinterestDark from "/src/assets/pinterestDark.svg"
import ThemeContext from "../utils/ThemeContext"

const SocialLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.isDarkMode ? '#fff' : '#000'};
  border-radius: 5px;
  padding-bottom: 2rem;
  @media (min-width: 64rem) {
    flex-direction: row;
    padding-bottom: 0;
  }
`;

const SocialLinksTitle = styled.h3`
  font-family: "Fjalla One", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  @media (min-width: 64rem) {
    margin-right: 1rem;
  }
`

const SocialLinksButtonsWrapper = styled.div`
  display: flex;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.isDarkMode ? "#353535" : "#cacaca"};
  margin: 0 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.isDarkMode ? "#5200FF" : "#9CE00C"};
  }
`;

const SocialIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const SocialLinks = () => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <SocialLinksWrapper theme={{ isDarkMode }}>
      <SocialLinksTitle>Socials</SocialLinksTitle>
      <SocialLinksButtonsWrapper>
        <SocialLink href="https://lemmy.world/c/isglitch" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? LemmyDark : LemmyLight} alt="Lemmy Icon" />
        </SocialLink>
        <SocialLink href="https://mastodon.world/@EtAl" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? MastodonDark : MastodonLight} alt="Mastodon Icon" />
        </SocialLink>
        <SocialLink href="https://x.com/EtAl19820625" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? TwitterDark : TwitterLight} alt="Twitter Icon" />
        </SocialLink>
        <SocialLink href="https://www.facebook.com/profile.php?id=61564773646719" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? FacebookDark : FacebookLight} alt="Facebook Icon" />
        </SocialLink>
        <SocialLink href="https://bsky.app/profile/isglitch.com" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? BlueSkyDark : BlueSkyLight} alt="Blue Sky Icon" />
        </SocialLink>
        <SocialLink href="https://www.threads.net/@etal_isglitch?invite=0" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? ThreadsDark : ThreadsLight} alt="Threads Icon" />
        </SocialLink>
        <SocialLink href="https://pin.it/6HXJoffF4" target="_blank" rel="noopener noreferrer" theme={{ isDarkMode }}>
          <SocialIcon src={isDarkMode ? PinterestDark : PinterestLight} alt="Pinterest Icon" />
        </SocialLink>
      </SocialLinksButtonsWrapper>
    </SocialLinksWrapper>
  );
};

export default SocialLinks;