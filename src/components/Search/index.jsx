import { Flex } from '@chakra-ui/react';
import Results from './Results';
import SearchInput from './SearchInput';

function Search() {
  return (
    <Flex flexDirection="column">
      <SearchInput />
      <Results />
    </Flex>
  );
}

export default Search;
