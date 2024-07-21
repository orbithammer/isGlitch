import { Helmet } from 'react-helmet-async';

type MetaTagsProps = {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}

const MetaTags = ({title, description, imageUrl, url}: MetaTagsProps) => {
  return (
    <Helmet>
      <meta name="description" content={description} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://isglitch.com${imageUrl}`} />
      <meta property="og:url" content={url} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@EtAl19820625" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://isglitch.com/${imageUrl}`} />
      <meta name="twitter:url" content={url} />
    </Helmet>
  );
};

export default MetaTags;
