import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import NewsCards from './NewsCards';
import NewsSkeleton from './NewsSkeleton';
import { parseAndSortFetchedData } from './parseRss';

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

    // Wait all fetch promises end
    Promise.all(promises).then((values) => {
      values.map((value) =>
        value
          .json()
          .then((json) =>
            setFetchResult((r) => {
              // eslint-disable-next-line no-shadow
              let items = json?.entry || json?.item;
              items = items.map((item) => ({
                ...item,
                logo: json?.image?.url,
              }));
              return [...r, ...items];
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
