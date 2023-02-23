import { Box, Flex, Text } from '@chakra-ui/react';
import CardResult from './CardResult';

function Results() {
  return (
    <Box>
      <Text>Vous avez 3 résultats</Text>
      <Flex>
        <CardResult />
        <CardResult />
        <CardResult />
      </Flex>
    </Box>
  );
}

export default Results;
