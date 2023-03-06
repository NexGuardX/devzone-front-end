import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteBookmark } from '../../features/bookmarks/bookmarksSlice';
import PageTitle from '../PageTitle';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const bookmarksGroupedByTools = useSelector((state) => state.bookmarks.listGroupedByTools);

  const handleClickDeleteBookmark = (id) => (e) => {
    e.preventDefault();
    dispatch(thunkDeleteBookmark(id));
  };

  return (
    <Box p="2rem">
      <PageTitle text="Bookmarks" />
      {bookmarksGroupedByTools.length === 0
        ? 'No bookmarks yet...'
        : bookmarksGroupedByTools.map((tool) => (
            <Box key={tool.toolId}>
              <Heading>{tool.name}</Heading>
              {tool.bookmarks.map((bookmark) => (
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
                      <AspectRatio width="150px" ratio={16 / 9}>
                        <Image borderRadius="8px" src={bookmark.imgLink} />
                      </AspectRatio>
                      <Text fontWeight="bold">{bookmark.name}</Text>
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
          ))}
    </Box>
  );
}
