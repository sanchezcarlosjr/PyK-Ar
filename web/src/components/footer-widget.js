/** @jsx jsx */
import { jsx, Box, Heading } from 'theme-ui';
import { Link } from './link';
import { rgba } from 'polished';

const FooterWidget = ({ title, items }) => {
  return (
    <Box sx={styles.footerWidget}>
      <Heading as="h4">{title}</Heading>
      <ul>
        {items.map(({ path, label }, i) => (
          <li key={i}>
            <Link path={path} key={i} label={label} variant="footer" />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default FooterWidget;

const styles = {
  footerWidget: {
    h4: {
      color: 'heading',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: 1.68,
      letterSpacing: 'heading',
    },
    ul: {
      listStyle: 'none',
      margin: '28px 0 0',
      padding: 0,
      a: {
        color: rgba('#02073E', 0.8),
      },
    },
  },
};
