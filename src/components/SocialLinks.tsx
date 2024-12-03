import { useContext } from 'react';
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

const SocialLinks = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`social-links-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <h3 className="social-links-title">Socials</h3>
      <div className="social-links-buttons-wrapper">
        <a 
          href="https://lemmy.world/c/isglitch" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? LemmyDark : LemmyLight} 
            alt="Lemmy Icon" 
          />
        </a>
        <a 
          href="https://mastodon.world/@EtAl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? MastodonDark : MastodonLight} 
            alt="Mastodon Icon" 
          />
        </a>
        <a 
          href="https://x.com/EtAl19820625" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? TwitterDark : TwitterLight} 
            alt="Twitter Icon" 
          />
        </a>
        <a 
          href="https://www.facebook.com/profile.php?id=61564773646719" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? FacebookDark : FacebookLight} 
            alt="Facebook Icon" 
          />
        </a>
        <a 
          href="https://bsky.app/profile/isglitch.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? BlueSkyDark : BlueSkyLight} 
            alt="Blue Sky Icon" 
          />
        </a>
        <a 
          href="https://www.threads.net/@etal_isglitch?invite=0" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? ThreadsDark : ThreadsLight} 
            alt="Threads Icon" 
          />
        </a>
        <a 
          href="https://pin.it/6HXJoffF4" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            className="social-icon"
            src={isDarkMode ? PinterestDark : PinterestLight} 
            alt="Pinterest Icon" 
          />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;