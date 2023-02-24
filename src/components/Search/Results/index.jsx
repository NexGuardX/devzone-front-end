import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CardResult from './CardResult';

function Results() {
  const results = useSelector((state) => state.search.results);
  return (
    <Box>
      <Flex flexDirection="column">
        {results.map((result) => (
          <CardResult key={result.question_id} result={result} />
        ))}
      </Flex>
    </Box>
  );
}

export default Results;
