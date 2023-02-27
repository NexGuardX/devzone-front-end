import { Alert, AlertIcon, Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NPMCardResult from './NPMCardResult';
import SOFCardResult from './SOFCardResult';

function Results() {
  const results = useSelector((state) => state.search.results);
  const searchTool = useSelector((state) => state.search.searchTools);

  const searchValue = useSelector((state) => state.search.search);
  const numberOfresults = useSelector((state) => state.search.numberOfresults);

  function randomID() {
    return new Date() * Math.random();
  }
  function switchRender(tool) {
    switch (tool) {
      case 'SOF':
        return results.map((result) => <SOFCardResult key={randomID()} result={result} />);
      case 'NPM':
        return results.map((result) => <NPMCardResult key={randomID()} result={result.package} />);
      default:
        return null;
    }
  }

  return (
    <Box marginTop="0.5rem">
      <Flex flexDirection="row" flexWrap="wrap" gap="1rem">
        {results.length > 0 ? (
          <Alert status="success" variant="left-accent" marginTop="1rem" width="100%">
            <AlertIcon />
            There are {numberOfresults} results for your search : &quot; {searchValue} &quot;
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
