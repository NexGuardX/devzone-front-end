import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';
import { FaGithub, FaNpm } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NPMCardResult({ result }) {
  const { description, keywords, links, name, version } = result;

  return (
    <Card direction="row" margin="auto">
      <HStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/2560px-Npm-logo.svg.png"
          alt="NPM"
          width="50px"
        />
        <Text fontSize="1rem">Node Package Manager</Text>
        <Button>
          <AiOutlineStar />
        </Button>
      </HStack>
      <Divider />

      <CardBody>
        <Stack mt="6" spacing="3" minHeight="180px">
          <Heading size="md">{name}</Heading>
          <Text>{description}</Text>
          <Text>Version : {version}</Text>
        </Stack>
        <Box maxH="110px" overflowY="auto">
          {keywords
            ? keywords.map((keyword) => (
                <Tag key={keyword} margin="0.3rem">
                  {keyword}
                </Tag>
              ))
            : null}
        </Box>
      </CardBody>
      <Divider />
      <HStack justifyContent="space-evenly">
        <Link to={links.npm} target="_blank">
          <Button margin="0.5rem">
            <FaNpm size="2rem" />
          </Button>
        </Link>
        <Link to={links.homepage} target="_blank">
          <Button margin="0.5rem">Home</Button>
        </Link>
        <Link to={links.repository} target="_blank">
          <Button margin="0.5rem">
            <FaGithub size="1.6rem" />
          </Button>
        </Link>
      </HStack>
    </Card>
  );
}

NPMCardResult.propTypes = {
  result: PropTypes.shape({
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.shape({
      homepage: PropTypes.string,
      npm: PropTypes.string,
      repository: PropTypes.string,
    }),
    name: PropTypes.string,
    version: PropTypes.string.isRequired,
  }),
};

NPMCardResult.defaultProps = {
  result: {},
};
export default NPMCardResult;
