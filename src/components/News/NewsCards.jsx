import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsStar } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import youtubeLogo from '../../assets/images/youtube.png';

/**
 * React Component that Displays News Cards
 * @returns {JSX.elements} React Component
 */
export default function NewsCards({ entries }) {
  return (
    <>
      {entries.map((item) => (
        <Card
          bg="gray.100"
          boxShadow="xl"
          key={item.title}
          border="1px solid lightgray"
          p="0.5rem"
          mb="3"
        >
          <CardBody>
            <Flex height="100%" flexDirection="column" justifyContent="space-between">
              <VStack align="stretch" height="100%">
                <AspectRatio maxW="400px" ratio={16 / 9}>
                  <Image borderRadius="8px" src={item.image} />
                </AspectRatio>

                <Heading as="h2" fontSize="md">
                  {item.title}
                </Heading>

                <Text fontSize="xs">
                  {new Date(item.date).toLocaleString().replace(',', '').split(' ').join(' - ')}
                </Text>
              </VStack>
              <Flex width="100%" justifyContent="flex-end">
                <a href={item.link} target="_blank" rel="noreferrer">
                  <Button
                    colorScheme="purple"
                    rightIcon={item.isVideo ? <FaPlay /> : <HiOutlineExternalLink />}
                  >
                    {item.isVideo ? 'Play' : 'Show More'}
                  </Button>
                </a>
              </Flex>
            </Flex>
          </CardBody>

          <Divider />

          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <HStack>
                <Avatar size="xs" name={item.author} src={item.logo || youtubeLogo} />
                <Text fontWeight="bold">{item.author}</Text>
              </HStack>
            </Box>
            <IconButton variant="ghost" icon={<BsStar />} />
          </Flex>
        </Card>
      ))}
    </>
  );
}

NewsCards.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      isVideo: PropTypes.bool.isRequired,
      logo: PropTypes.string,
    })
  ).isRequired,
};
