import { Box } from '@chakra-ui/react';
import Intro from './Intro';

/**
 * React Component that Displays Home Page
 * @returns {JSX.elements} React Component
 */
export default function Home() {
  return (
    <Box p="1rem" maxW="960px" margin="0 auto">
      <Intro />
    </Box>
  );
}
