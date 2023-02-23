import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

function SearchInput() {
  return (
    <form>
      <FormControl>
        <FormLabel>Lancer une recherche</FormLabel>
        <Input type="text" />
      </FormControl>
      <Button>SOF</Button>
    </form>
  );
}

export default SearchInput;
