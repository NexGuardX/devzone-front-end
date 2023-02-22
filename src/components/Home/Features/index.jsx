import { Box, Flex, Heading, Icon } from '@chakra-ui/react';
import { FaFileCode as FeatureIcon } from 'react-icons/fa';

export default function Features() {
  return (
    <Flex as="section" flexDirection="column" alignItems="center">
      <Flex flexDirection={{ base: 'column', md: 'row' }} rowGap="2rem" columnGap="2rem">
        <Box textAlign="center">
          <Icon as={FeatureIcon} boxSize={48} />
          <Heading as="h3">Feature1</Heading>
        </Box>
        <Box textAlign="center">
          <Icon as={FeatureIcon} boxSize={48} />
          <Heading as="h3">Feature2</Heading>
        </Box>
        <Box textAlign="center">
          <Icon as={FeatureIcon} boxSize={48} />
          <Heading as="h3">Feature3</Heading>
        </Box>
      </Flex>
      <div>Shortcuts</div>
    </Flex>
  );
}
