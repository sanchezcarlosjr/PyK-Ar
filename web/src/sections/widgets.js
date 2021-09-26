/** @jsx jsx */
import { jsx, Box, Container, Text, Image as Img } from 'theme-ui';
import { useStaticQuery, graphql } from 'gatsby';
import { LearnMore } from '../components/link';
import SectionHeading from '../components/section-heading';
import Image from '../components/image';

import checkFilledCircle from '../images/icons/check-circle-filled.png';

const Widgets = () => {
  const data = useStaticQuery(graphql`
    query {
      widgets: file(relativePath: { eq: "widgets.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return (
    <Box as="section" id="widgets" variant="section.widgets">
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.leftContent}>
            <Image src={data.widgets.childImageSharp.fluid} alt="widgets" />
          </Box>
          <Box sx={styles.rightContent}>
            <SectionHeading
              sx={styles.heading}
              title="Ultimate widgets of collection that will be used anywhere"
              description="Get your tests delivered at let home collect sample from the victory of the managements that supplies best design system guidelines ever."
            />
            <Text sx={styles.listItem} as="p">
              <Img src={checkFilledCircle} alt="check icon" />
              Unlimited design possibility
            </Text>
            <Text sx={styles.listItem} as="p">
              <Img src={checkFilledCircle} alt="check icon" />
              Completely responsive features
            </Text>
            <Box sx={styles.explore}>
              <LearnMore path="#!" label="Explore More" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Widgets;

const styles = {
  contentWrapper: {
    gap: [0, 0, 0, 0, 10, 100],
    display: ['block', 'block', 'grid'],
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'left',
    mb: ['20px'],
    mt: [0, 0, 0, 0, '-70px'],
    h2: {
      fontSize: ['24px', '24px', '24px', '28px', '32px', '40px'],
      lineHeight: [1.45, 1.5],
      letterSpacing: '-1.5px',
    },
  },
  listItem: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 2.81,
    display: 'flex',
    alignItems: 'center',
    img: {
      mr: '10px',
    },
  },
  explore: {
    mt: ['20px', '20px', '20px', '20px', '40px'],
  },
};
