/** @jsx jsx */
import { jsx, Image } from 'theme-ui';
import { Link } from './link';
import logo from '../images/logo.png';
import logoWhite from '../images/logo-white.png';

export default function Logo({ isWhite }) {
  return (
    <Link
      path="/"
      sx={{
        variant: 'links.logo',
      }}
    >
      <Image src={isWhite ? logoWhite : logo} alt="startup landing logo" />
    </Link>
  );
}
