/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useClipboard,
  useToast,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { FaClipboard, FaGithub } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getToolBookmarks, isBookmarked } from '../../../common/helpers/bookmarks';
import { thunkAddBookmark, thunkDeleteBookmark } from '../../../features/bookmarks/bookmarksSlice';

function GHCardResult({ result }) {
  const { name, owner, description, html_url, language, ssh_url } = result;
  const toast = useToast();

  const dispatch = useDispatch();
  const toolId = useSelector((state) => state.application.currentToolId);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.id);
  const bookmarksGroupedByTools = useSelector((state) => state.bookmarks.listGroupedByTools);

  const handleClickStar = (item) => () => {
    const imgLink = 'https://logos-marques.com/wp-content/uploads/2021/03/GitHub-Logo.png';
    const { name, html_url: link } = item;
    dispatch(thunkAddBookmark({ name, link, imgLink, toolId, userId }));
  };

  const handleClickUnstar = (link, bookmarkToolId) => () => {
    // Get array of bookmarks for toolID
    const toolBookmarks = getToolBookmarks(bookmarkToolId, bookmarksGroupedByTools);

    // Find id to delete with link url
    const bookmarkIdToDelete = toolBookmarks.find((bookmark) => bookmark.link === link).id;
    dispatch(thunkDeleteBookmark(bookmarkIdToDelete));
  };

  const { onCopy } = useClipboard(ssh_url);

  const handleCopy = () => {
    toast({
      title: 'Copied!',
    });
    onCopy();
  };

  return (
    <Card
      margin="auto"
      boxShadow="xl"
      width={{ base: '100%', md: '90%' }}
      border="1px solid lightgray"
    >
      {/* <HStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://logos-marques.com/wp-content/uploads/2021/03/GitHub-Logo.png"
          alt="GitHub"
          width="50px"
        />
        <Text fontSize="1rem">GitHub</Text>
        <Button>
          <AiOutlineStar />
        </Button>
      </HStack> */}

      <Flex direction="row" justifyContent="space-between">
        <Link to={html_url} target="_blank">
          <CardBody>
            <Flex margin="0.5rem 0">
              <Box>
                <HStack>
                  <Heading size="md">{name}</Heading>
                </HStack>

                <Text>{description}</Text>

                <Text fontSize="0.8rem">Language : {language}</Text>
              </Box>
            </Flex>

            <HStack>
              <Image src={owner.avatar_url} width="1.5rem" borderRadius="full" />
              <Text>{owner.login}</Text>
            </HStack>
          </CardBody>
        </Link>
        <VStack margin="0.5rem" justifyContent="space-evenly">
          <Button padding="0.3rem" fontSize="1rem" onClick={handleCopy}>
            SSH
            <FaClipboard />
          </Button>

          <Link to={html_url} target="_blank">
            <Button display={{ base: 'none', md: 'flex' }}>
              <FaGithub size="1.6rem" />
            </Button>
          </Link>

          {username ? (
            <IconButton
              icon={
                isBookmarked(result.html_url, toolId, bookmarksGroupedByTools) ? (
                  <BsStarFill
                    style={{ color: '#FDCC0D' }}
                    onClick={handleClickUnstar(result.html_url, toolId)}
                  />
                ) : (
                  <BsStar onClick={handleClickStar(result)} />
                )
              }
            />
          ) : null}
        </VStack>
      </Flex>
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
    language: PropTypes.string,
    html_url: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    ssh_url: PropTypes.string.isRequired,
  }),
};

GHCardResult.defaultProps = {
  result: {
    homepage: null,
    language: null,
  },
};
export default GHCardResult;
