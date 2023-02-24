import { Box, Button, Card, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const { REACT_APP_APIEXT_URL } = process.env;

const RSS_LIST = [
  'https://www.freecodecamp.org/news/rss',
  'https://www.youtube.com/feeds/videos.xml?channel_id=UCFbNIlppjAuEX4znoulh0Cw',
];

const parseFetchedData = (dataArray) =>
  dataArray.map((data) => ({
    title: data.title,
    date: data?.published || data?.pubDate,
    image:
      (data['media:content'] && data['media:content']['@_url']) ||
      (data['media:group'] &&
        data['media:group']['media:thumbnail'] &&
        data['media:group']['media:thumbnail']['@_url']),
    link: data.link,
  }));

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
    <Box>
      <div>
        {parseFetchedData(fetchResult).map((item) => (
          <Card key={item.date} maxW="sm" border="1px solid" p="8px" mb="3">
            <Image maxW="300px" src={item.image} />
            <p>{item.date}</p>
            <p>{item.title}</p>
            <p>
              <Button>
                <a href={item.link} target="_blank" rel="noreferrer">
                  Link
                </a>
              </Button>
            </p>
          </Card>
        ))}
      </div>
    </Box>
  );
}
