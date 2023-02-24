import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

const { REACT_APP_APIEXT_URL } = process.env;

const RSS_LIST = [
  'https://www.freecodecamp.org/news/rss',
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCFbNIlppjAuEX4znoulh0Cw', // WebDevSimplified
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCsBjURrPoezykLs9EqgamOA', // Fireship
];
// TODO : loading
// TODO : Origin icon + name
// TODO : Type of article
// TODO : comment
// TODO : jsdoc
const parseAndSortFetchedData = (dataArray) =>
  dataArray
    .map((data) => ({
      title: data.title,
      date: data?.published || data?.pubDate,
      image:
        (data['media:content'] && data['media:content']['@_url']) ||
        (data['media:group'] &&
          data['media:group']['media:thumbnail'] &&
          data['media:group']['media:thumbnail']['@_url']),
      link: data.link,
    }))
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export default function News() {
  const [fetchResult, setFetchResult] = useState([]);
  console.log('⏩ ~ Content ~ fetchResult:', fetchResult);
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
        value.json().then((json) =>
          setFetchResult((r) => {
            const items = json?.entry || json?.item;
            return [...r, ...items];
          })
        )
      );
    });
  }, []);

  return (
    <Box p="2rem">
      <Heading as="h1" pb="2rem">
        News
      </Heading>
      <SimpleGrid minChildWidth="320px" gap="2rem">
        {parseAndSortFetchedData(fetchResult).map((item) => (
          <Card key={item.date} border="1px solid" p="0.5rem" mb="3">
            <CardBody>
              <Image src={item.image} h="220px" w="100%" objectFit="cover" />
              <Text>{item.date}</Text>
              <Heading as="h2" fontSize="md">
                {item.title}
              </Heading>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button rightIcon={<HiOutlineExternalLink />}>
                <a href={item.link} target="_blank" rel="noreferrer">
                  Link
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
