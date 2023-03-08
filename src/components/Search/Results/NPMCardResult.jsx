import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
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
    <Card
      margin="auto"
      boxShadow="xl"
      width={{ base: '100%', md: '90%' }}
      border="1px solid lightgray"
    >
      <Flex direction="row" justifyContent="space-between">
        <Link to={links.npm} target="_blank">
          {/* <VStack justifyContent="space-around" padding="0.5rem">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/2560px-Npm-logo.svg.png"
          alt="NPM"
          width="70px"
          height="60px"
        />
      </VStack>
      <Divider orientation="vertical" /> */}

          <CardBody direction="row" padding="0.4rem">
            <Box>
              <Heading size="md">{name}</Heading>
              <Text wordBreak="break-all" overflow="hidden">
                {description}
              </Text>
              <Text>Version : {version}</Text>
            </Box>

            <Box display={{ base: 'none', lg: 'block' }} maxH="110px" overflowY="auto">
              {keywords
                ? keywords.map((keyword) => (
                    <Tag key={keyword} margin="0.3rem">
                      {keyword}
                    </Tag>
                  ))
                : null}
            </Box>
          </CardBody>

          <Stack direction="column" justifyContent="space-around" padding="0.2rem">
            <HStack display={{ base: 'none', md: 'flex' }} justifyContent="space-around">
              <Link to={links.npm} target="_blank">
                <Button>
                  <FaNpm size="2rem" />
                </Button>
              </Link>
              <Link to={links.homepage} target="_blank">
                <Button>Home</Button>
              </Link>
            </HStack>

            <HStack justifyContent="space-around">
              <Link to={links.repository} target="_blank">
                <Button display={{ base: 'none', md: 'block' }}>
                  <FaGithub size="1.6rem" />
                </Button>
              </Link>
              <Button>
                <AiOutlineStar size="1.3rem" />
              </Button>
            </HStack>
          </Stack>
        </Link>
      </Flex>
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
