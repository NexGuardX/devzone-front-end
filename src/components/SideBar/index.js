import { Box, LinkBox, LinkOverlay, SimpleGrid } from '@chakra-ui/react';

import './style.scss';

function SideBar() {
  return (
    <SimpleGrid className="sideBar" flexDirection="column" spacing="8" p="10" textAlign="center">
      <LinkBox>
        <Box boxShadow="lg" p="6" rounded="md" bg="white">
          <LinkOverlay href="#">News</LinkOverlay>
        </Box>
      </LinkBox>
      <LinkBox>
        <Box boxShadow="lg" p="6" rounded="md" bg="white">
          <LinkOverlay href="#">Search</LinkOverlay>
        </Box>
      </LinkBox>
      <LinkBox>
        <Box boxShadow="lg" p="6" rounded="md" bg="white">
          <LinkOverlay href="#">PlayGround</LinkOverlay>
        </Box>
      </LinkBox>
    </SimpleGrid>
  );
}

export default SideBar;
