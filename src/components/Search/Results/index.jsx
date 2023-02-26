import { Alert, AlertIcon, Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import CardResult from './CardResult';

function Results() {
  const results = useSelector((state) => state.search.results);
  const searchValue = useSelector((state) => state.search.search);
  const numberOfresults = useSelector((state) => state.search.numberOfresults);
  return (
    <Box>
      <Flex flexDirection="column">
        {results.length > 0 ? (
          <Alert status="success" variant="left-accent">
            <AlertIcon />
            There are {numberOfresults} for your search : &quot; {searchValue} &quot;
          </Alert>
        ) : (
          <Alert status="warning" margin="0.5rem">
            <AlertIcon />
            There are no results for your search : &quot; {searchValue} &quot;
          </Alert>
        )}
        {results.map((result) => (
          <CardResult key={result.question_id} result={result} />
        ))}
      </Flex>
    </Box>
  );
}

export default Results;
