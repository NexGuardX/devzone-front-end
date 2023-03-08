import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteBookmark } from '../../features/bookmarks/bookmarksSlice';
import PageTitle from '../PageTitle';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const bookmarksGroupedByTools = useSelector((state) => state.bookmarks.listGroupedByTools);
  const totalBookmarks = useSelector((state) => state.bookmarks.total);

  const handleClickDeleteBookmark = (id) => (e) => {
    e.preventDefault();
    dispatch(thunkDeleteBookmark(id));
  };

  return (
    <Box p="2rem">
      <PageTitle text="Bookmarks" />
      {!totalBookmarks ? (
        'No bookmarks yet...'
      ) : (
        <Tabs>
          <TabList>
            {bookmarksGroupedByTools.map((tool) =>
              !tool.bookmarks.length ? null : <Tab key={tool.toolId}>{tool.name}</Tab>
            )}
          </TabList>

          <TabPanels>
            {bookmarksGroupedByTools.map((tool) =>
              !tool.bookmarks.length ? null : (
                <TabPanel key={tool.toolId}>
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
                </TabPanel>
              )
            )}
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
}
