/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import { Box, Card, Flex, Heading, HStack, IconButton, Tag, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToolBookmarks, isBookmarked } from '../../../common/helpers/bookmarks';
import { thunkAddBookmark, thunkDeleteBookmark } from '../../../features/bookmarks/bookmarksSlice';

function SOFCardResult({ result }) {
  const { tags, title, link, is_answered } = result;

  const dispatch = useDispatch();
  const toolId = useSelector((state) => state.application.currentToolId);
  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user.id);
  const bookmarksGroupedByTools = useSelector((state) => state.bookmarks.listGroupedByTools);

  const handleClickStar = (item) => () => {
    const imgLink =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png';
    const { title: name, link } = item;
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
    <Card
      margin="auto"
      boxShadow="xl"
      width={{ base: '100%', md: '90%' }}
      border="1px solid lightgray"
      padding="0.5rem"
    >
      <Flex direction="row" justifyContent="space-between">
        <Link to={link} target="_blank">
          {/* <VStack padding="0.5rem" justifyContent="space-evenly">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png"
          alt="NPM"
          width="50px"
        />
      </VStack> */}
          <Box>
            <Heading size="md">{title}</Heading>

            <HStack>
              <Text> Is answered ? </Text>
              {is_answered ? <AiOutlineCheck color="green" /> : <AiOutlineClose color="red" />}
            </HStack>
            {tags.map((tag) => (
              <Tag key={tag} margin="0.3rem">
                {tag}
              </Tag>
            ))}
          </Box>
        </Link>
        {username ? (
          <IconButton
            icon={
              isBookmarked(result.link, toolId, bookmarksGroupedByTools) ? (
                <BsStarFill
                  style={{ color: '#FDCC0D' }}
                  onClick={handleClickUnstar(result.link, toolId)}
                />
              ) : (
                <BsStar onClick={handleClickStar(result)} />
              )
            }
          />
        ) : null}
      </Flex>
    </Card>
  );
}

SOFCardResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string.isRequired,
    answer_count: PropTypes.number.isRequired,
    is_answered: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SOFCardResult;
