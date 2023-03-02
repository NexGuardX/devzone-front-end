import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NewsCards from './NewsCards';
import NewsSkeleton from './NewsSkeleton';
import { getEntriesFromRssJson, parseAndSortFetchedData } from './parseRss';

const { REACT_APP_APIEXT_URL } = process.env;

/**
 * RSS Feeds
 * - create a feed on rss.app (to generate a feed with all important datas including image)
 * - add the generated feed to the list
 */
const RSS_LIST = [
  'https://www.freecodecamp.org/news/rss',
  'https://rss.app/feeds/rlIgUQu1yZMkJPSr.xml', // CSS tricks
  'https://rss.app/feeds/ozZVa9oz323O11W4.xml', // dev.to
  'https://rss.app/feeds/rBjanTnSHUwMc2vm.xml', // LogRocket
  'https://rss.app/feeds/XXKIuLS9Zof1Hf1R.xml', // sitepoint
  'https://rss.app/feeds/5O5NpvuF9es9Ne6W.xml', // smashingmagazine.com
  'https://rss.app/feeds/XwYF0hX2DMrNhzog.xml', // web.dev
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCY38RvRIxYODO4penyxUwTg', // https://www.youtube.com/@DaveGrayTeachesCode
  'https://www.youtube.com/feeds/videos.xml?channel_id=UClb90NQQcskPUGDIXsQEz5Q', // developped by Ed
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA', // Fireship
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCbRP3c757lWg9M-U7TyEkXA', // theo t2.gg
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCFbNIlppjAuEX4znoulh0Cw', // WebDevSimplified
];

/**
 * React Component that Displays News Page
 * @returns {JSX.elements} React Component
 */
export default function News() {
  const location = useLocation();
  const { toolId } = location.state;
  const [fetchResult, setFetchResult] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // list of Fetched url (in order to don't fetch already fetched data)
  const fetched = useRef([]);

  // First render Execution
  useEffect(() => {
    const promises = [];

    // Fetch all Rss in parallel
    RSS_LIST.forEach((rss) => {
      // Fetch only rss that not alredy fetched
      if (!fetched.current.includes(rss)) {
        promises.push(fetch(`${REACT_APP_APIEXT_URL}/rss?url=${rss}`));
        fetched.current.push(rss);
      }
    });

    // Treat all fetch promises end
    // - if status !== 200 => do nothing
    // - if status === 200 => treat fetch result to keep all items (unique) and add them to result state
    Promise.allSettled(promises).then((promisesResults) => {
      promisesResults.forEach(
        (promiseResult) =>
          promiseResult.value.status === 200 &&
          promiseResult.value
            .json()
            .then((json) =>
              setFetchResult((prevFetchResult) => {
                const entries = getEntriesFromRssJson(json);
                return [...prevFetchResult, ...entries];
              })
            )
            .finally(() => {
              setIsLoaded(true);
            })
      );
    });
  }, []);

  // Transform entries
  const entries = parseAndSortFetchedData(fetchResult);

  return (
    <Box p="2rem" maxW="1200px" margin="0 auto">
      <Heading as="h1" pb="2rem">
        News
      </Heading>

      <SimpleGrid minChildWidth="320px" gap="2rem">
        <NewsSkeleton isLoaded={isLoaded} />
        <NewsCards entries={entries} />
      </SimpleGrid>
    </Box>
  );
}
