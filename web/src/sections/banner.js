/** @jsx jsx */
import {
  jsx,
  Box,
  Container,
  Heading,
  Text,
  Button,
} from 'theme-ui';
import {Link} from "gatsby";


const Banner = () => {
  return (
    <Box id="home" as="section" variant="section.banner">
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Heading sx={styles.title}>
              Potassium-Argon Dating software
            </Heading>
            <Link style={{'text-decoration': 'none'}} to="/admin">
              <Button variant="primary" sx={styles.button}>
                Sign in free
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  contentWrapper: {
    display: [null, null, null, 'grid'],
    gridTemplateColumns: [null, null, null, '0.9fr 1.1fr', 'repeat(2, 1fr)'],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: [null, null, null, null, null, '100vh'],
    pt: [100, null, null, 120, 130, 120, 0],
  },
  content: {
    maxWidth: [507, 507, 507, 324, 450],
  },
  title: {
    fontWeight: 'bold',
    fontSize: ['50px', null, null, null, '60px', '62px', '80px'],
    lineHeight: 1.33,
    letterSpacing: '-1px',
    color: 'textSecondary',
  },
  text: {
    fontSize: ['14px', '14px', '14px', '16px', '16px', '18px'],
    lineHeight: [1.85, 1.85, 1.85, 1.85, 1.85, 2.33],
    color: 'textSecondary',
    mt: ['14px', '19px'],
  },
  button: {
    display: ['none', 'flex'],
    mt: [45, 45, 45, 25, 25],
  },
  clients: {
    display: 'flex',
    alignItems: 'center',
    mt: ['20px', '45px', '45px', '30px', '45px'],
    img: {
      maxWidth: ['80px', '100%', '100%', '100%'],
      '+ img': {
        ml: ['14px', '28px', '28px', '20px'],
      },
    },
  },
  illustration: {
    mt: ['30px', '30px', 0],
    mb: ['60px', '60px', 0],
    img: {
      maxWidth: [null, null, null, null, '90%', '90%', '100%'],
    },
  },
};
