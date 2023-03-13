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
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { getToolBookmarks, isBookmarked } from '../../common/helpers/bookmarks';
import { thunkAddBookmark, thunkDeleteBookmark } from '../../features/bookmarks/bookmarksSlice';

/**
 * React Component that Displays News Cards
 * @returns {JSX.elements} React Component
 */
export default function NewsCards({ entries }) {
  const dispatch = useDispatch();
  const toolId = useSelector((state) => state.application.currentToolId);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.id);
  const bookmarksGroupedByTools = useSelector((state) => state.bookmarks.listGroupedByTools);

  const handleClickStar = (item) => () => {
    const { title: name, link, image: imgLink } = item;
    dispatch(thunkAddBookmark({ name, link, imgLink, toolId, userId }));
  };

  const handleClickUnstar = (link, bookmarkToolId) => () => {
    // Get array of bookmarks for toolID
    const toolBookmarks = getToolBookmarks(bookmarkToolId, bookmarksGroupedByTools);

    // Find id to delete with link url
    const bookmarkIdToDelete = toolBookmarks.find((bookmark) => bookmark.link === link).id;
    dispatch(thunkDeleteBookmark(bookmarkIdToDelete));
  };

  return (
    <>
      {entries.map((item) => (
        <Card boxShadow="xl" key={item.title} border="1px solid lightgray" p="0.5rem" mb="3">
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
            <Box pt="0.5rem">
              <HStack>
                <Avatar size="xs" name={item.author} src={item.logo} />
                <Text fontWeight="bold">{item.author}</Text>
              </HStack>
            </Box>
            {username ? (
              <IconButton
                marginTop="0.5rem"
                // variant="ghost"
                icon={
                  isBookmarked(item.link, toolId, bookmarksGroupedByTools) ? (
                    <BsStarFill
                      style={{ color: '#FDCC0D' }}
                      onClick={handleClickUnstar(item.link, toolId)}
                    />
                  ) : (
                    <BsStar onClick={handleClickStar(item)} />
                  )
                }
              />
            ) : null}
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
