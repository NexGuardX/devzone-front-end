import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NPMCardResult({ result }) {
  const { description, keywords, links, name } = result;

  return (
    <Card maxW="350px" margin="auto" height="500px">
      <CardBody>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/2560px-Npm-logo.svg.png"
          alt={name}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>{description}</Text>
        </Stack>
        {keywords
          ? keywords.map((keyword) => (
              <Tag key={keyword} margin="0.3rem">
                {keyword}
              </Tag>
            ))
          : null}
      </CardBody>
      <Divider />
      <CardFooter>
        <Link to={links.npm} target="_blank">
          <Button margin="0.5rem">NPM</Button>
        </Link>
        <Link to={links.homepage} target="_blank">
          <Button margin="0.5rem">Home</Button>
        </Link>
        <Link to={links.repository} target="_blank">
          <Button margin="0.5rem">Repository</Button>
        </Link>
      </CardFooter>
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
  }),
};

NPMCardResult.defaultProps = {
  result: {},
};
export default NPMCardResult;
