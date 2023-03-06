import { Box, Flex, HStack, IconButton, Image, Link, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  thunkDeleteBookmark,
  thunkFetchUserBookmarks,
} from '../../features/bookmarks/bookmarksSlice';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.list);
  const username = useSelector((state) => state.user.username);
  // const bookmarksToolsIds = bookmarks.reduce((acc, bookmark) => acc.includes(bookmark.toolId));

  useEffect(() => {
    if (username) {
      dispatch(thunkFetchUserBookmarks());
    }
  }, []);

  const handleClickDeleteBookmark = (id) => (e) => {
    e.preventDefault();
    console.log('DELETE BOOKMARK with ID ', id);
    dispatch(thunkDeleteBookmark(id));
  };

  return (
    <Box p="2rem">
      {bookmarks.map((bookmark) => (
        <Link key={bookmark.id} href={bookmark.link} target="_blank" rel="noreferrer">
          <Flex
            borderRadius="8px"
            border="1px solid lightgray"
            justifyContent="space-between"
            boxShadow="md"
            p="0.5rem"
            mb="1rem"
          >
            <HStack>
              <Image src={bookmark.imgLink} />
              <Text>{bookmark.toolId}</Text>
              <Text>{bookmark.name}</Text>
            </HStack>
            <HStack>
              <IconButton
                color="red.500"
                icon={<RiDeleteBinFill />}
                onClick={handleClickDeleteBookmark(bookmark.id)}
              />
            </HStack>
          </Flex>
        </Link>
      ))}
    </Box>
  );
}
