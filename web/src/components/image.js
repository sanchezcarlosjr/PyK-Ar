import React from 'react';
import { StaticImage } from "gatsby-plugin-image"

export default function Image({ src, ...rest }) {
  return <StaticImage src={src} {...rest} />;
}
