import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsStar } from 'react-icons/bs';
import { HiOutlineExternalLink } from 'react-icons/hi';
import youtubeLogo from '../../assets/images/youtube.png';

const { REACT_APP_APIEXT_URL } = process.env;

const RSS_LIST = [
  'https://www.freecodecamp.org/news/rss',
  'https://rss.app/feeds/rlIgUQu1yZMkJPSr.xml', // CSS tricks
  'https://rss.app/feeds/ozZVa9oz323O11W4.xml', // dev.to
  'https://rss.app/feeds/rBjanTnSHUwMc2vm.xml', // LogRocket
  'https://rss.app/feeds/XXKIuLS9Zof1Hf1R.xml', // sitepoint
  'https://rss.app/feeds/5O5NpvuF9es9Ne6W.xml', // smashingmagazine.com
  'https://rss.app/feeds/XwYF0hX2DMrNhzog.xml', // web.dev
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCFbNIlppjAuEX4znoulh0Cw', // WebDevSimplified
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA', // Fireship
];
// TODO : loading
// TODO : Type of article
// TODO : comment
// TODO : jsdoc

const getAuthorFromEntry = (entry) => entry['dc:creator'] || entry.author.name;
const getImageFromEntry = (entry) =>
  (entry['media:content'] && entry['media:content']['@_url']) ||
  (entry['media:group'] &&
    entry['media:group']['media:thumbnail'] &&
    entry['media:group']['media:thumbnail']['@_url']) ||
  entry?.enclosure['@_url'];

const getDateFromEntry = (entry) =>
  Date.parse(entry?.published || entry?.pubDate || entry?.lastBuildDate);

const parseAndSortFetchedData = (entries) =>
  entries
    .map((entry) => ({
      author: getAuthorFromEntry(entry),
      title: entry.title,
      date: getDateFromEntry(entry),
      image: getImageFromEntry(entry),
      link: entry.link,
      logo: entry.logo,
    }))
    .sort((a, b) => b.date - a.date);

export default function News() {
  const [fetchResult, setFetchResult] = useState([]);
  const [isLoaded, setIsLoaded] = useState(0);
  const fetched = useRef([]);

  useEffect(() => {
    const promises = [];

    RSS_LIST.forEach((rss) => {
      // Fetch only rss that not alredy fetched
      if (!fetched.current.includes(rss)) {
        promises.push(fetch(`${REACT_APP_APIEXT_URL}/rss?url=${rss}`));
        fetched.current.push(rss);
      }
    });

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
            console.log('loaded', isLoaded);
            setIsLoaded(true);
          })
      );
    });
  }, []);

  const entries = parseAndSortFetchedData(fetchResult);

  return (
    <Box p="2rem" maxW="1200px" margin="0 auto">
      <Heading as="h1" pb="2rem">
        News
      </Heading>

      <SimpleGrid minChildWidth="320px" gap="2rem">
        {Array(6)
          .fill(0)
          .map((skeleton, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <VStack display={isLoaded && 'none'} key={index}>
              <SkeletonCircle isLoaded={isLoaded} size="10" fadeDuration={1} />
              <Skeleton height="200px" isLoaded={isLoaded} fadeDuration={1} />
              <SkeletonText
                isLoaded={isLoaded}
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="3"
                fadeDuration={1}
              />
            </VStack>
          ))}
        {entries.map((item) => (
          <Card key={item.title} border="1px solid" p="0.5rem" mb="3">
            <CardHeader>
              <Flex justifyContent="space-between">
                <Box>
                  <HStack>
                    <Avatar size="sm" name={item.author} src={item.logo || youtubeLogo} />
                    <Text fontWeight="bold">{item.author}</Text>
                  </HStack>
                </Box>
                <IconButton variant="ghost" icon={<BsStar />} />
              </Flex>
            </CardHeader>
            <CardBody>
              <VStack align="stretch">
                <AspectRatio maxW="400px" ratio={16 / 9}>
                  <Image src={item.image} />
                </AspectRatio>

                <Heading as="h2" fontSize="md">
                  {item.title}
                </Heading>
              </VStack>
              <Text textAlign="left" fontSize="xs">
                {new Date(item.date).toLocaleString().replace(',', '').split(' ').join(' - ')}
              </Text>
            </CardBody>
            <Divider />
            <CardFooter>
              <Flex width="100%" justifyContent="flex-end">
                <a href={item.link} target="_blank" rel="noreferrer">
                  <Button rightIcon={<HiOutlineExternalLink />}>Show More</Button>
                </a>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
