import { Alert, AlertIcon, Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NPMCardResult from './NPMCardResult';
import SOFCardResult from './SOFCardResult';

function Results() {
  const results = useSelector((state) => state.search.results);
  const searchTool = useSelector((state) => state.search.searchTools);
  function randomID(score) {
    return new Date() * Math.random() - score;
  }

  console.log('results', results);
  function switchRender(tool) {
    switch (tool) {
      case 'SOF':
        return results.map((result) => <SOFCardResult key={result.question_id} result={result} />);
      case 'NPM':
        return results.map((result) => (
          <NPMCardResult key={randomID(result.searchScore)} result={result.package} />
        ));
      default:
        return null;
    }
  }

  const searchValue = useSelector((state) => state.search.search);
  const numberOfresults = useSelector((state) => state.search.numberOfresults);
  return (
    <Box marginTop="0.5rem">
      <Flex flexDirection="row" flexWrap="wrap" gap="1rem">
        {results.length > 0 ? (
          <Alert status="success" variant="left-accent" marginTop="1rem" width="100%">
            <AlertIcon />
            There are {numberOfresults} for your search : &quot; {searchValue} &quot;
          </Alert>
        ) : (
          <Alert status="warning" variant="left-accent" marginTop="1rem" width="100%">
            <AlertIcon />
            There are no results for your search : &quot; {searchValue} &quot;
          </Alert>
        )}
        {switchRender(searchTool)}
      </Flex>
    </Box>
  );
}

export default Results;
