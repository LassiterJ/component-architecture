import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

// Example of a non-composable Hero Component
export const HeroImage = ({ image, publicUrl, title, isLink, href }) => {
  const gatsbyImage = getImage(
    image.localFile?.childImageSharp?.gatsbyImageData
  );

  if (!gatsbyImage) {
    return <Svg url={publicUrl} />;
  }

  return isLink ? (
    <Link to={href}>
      <GatsbyImage image={gatsbyImage} alt={title} loading="eager" />
    </Link>
  ) : (
    <GatsbyImage image={gatsbyImage} alt={title} loading="eager" />
  );
};

export const Hero = ({ minHeight, coverImage, isLink, href }) => {
  return (
    <div>
      {true ? <CarouselSlide /> : coverImage && <HeroImage {...coverImage} />}
    </div>
  );
};
