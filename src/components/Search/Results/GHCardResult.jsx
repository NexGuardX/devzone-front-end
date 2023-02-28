/* eslint-disable camelcase */
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineStar } from 'react-icons/ai';
import { FaClipboard, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function GHCardResult({ result }) {
  const { name, owner, description, html_url, homepage, language, ssh_url } = result;
  const toast = useToast();

  const { onCopy } = useClipboard(ssh_url);

  const handleCopy = () => {
    toast({
      title: 'Copied!',
    });
    onCopy();
  };

  return (
    <Card width="350px" margin="auto" height="500px">
      <HStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://logos-marques.com/wp-content/uploads/2021/03/GitHub-Logo.png"
          alt="GitHub"
          width="50px"
        />
        <Text fontSize="1rem">GitHub</Text>
        <Button>
          <AiOutlineStar />
        </Button>
      </HStack>
      <Divider />

      <CardBody>
        <Box mt="6" spacing="3">
          <HStack justifyContent="space-between" marginBottom="1.5rem">
            <Heading size="md">{name}</Heading>
            <Button onClick={handleCopy} minWidth="110px">
              SSH Key <FaClipboard />
            </Button>
          </HStack>
          <Box marginTop="2rem">
            <Text>{description}</Text>

            <Text marginTop="1rem">Language : {language}</Text>
          </Box>

          <HStack position="absolute" bottom="100px">
            <Image src={owner.avatar_url} width="4rem" borderRadius="full" />
            <Text>{owner.login}</Text>
          </HStack>
        </Box>
      </CardBody>
      <Divider />
      <HStack justifyContent="space-evenly">
        {homepage ? (
          <Link to={homepage} target="_blank">
            <Button margin="0.5rem">Home</Button>
          </Link>
        ) : null}

        <Link to={html_url} target="_blank">
          <Button margin="0.5rem">
            <FaGithub size="1.6rem" /> See on GitHub
          </Button>
        </Link>
      </HStack>
    </Card>
  );
}

GHCardResult.propTypes = {
  result: PropTypes.shape({
    description: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
    name: PropTypes.string,
    language: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    ssh_url: PropTypes.string.isRequired,
  }),
};

GHCardResult.defaultProps = {
  result: {
    homepage: null,
  },
};
export default GHCardResult;
