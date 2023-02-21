import { Box, Heading, IconButton, Img } from '@chakra-ui/react';
import { RxClipboardCopy } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import Description from './Description';

function Profil() {
  const user = useSelector((state) => state.user);
  const tools = useSelector((state) => state.tools);

  console.log(tools);
  return (
    <Box>
      <Heading as="h1" margin="1.5rem">
        PROFILE
      </Heading>

      <Img
        margin="auto"
        w="50%"
        maxW="300px"
        rounded="full"
        border="3px solid black"
        src={user.avatar}
      />
      <Heading marginTop="0.5rem" as="h2">
        {user.username}
        <IconButton>
          <RxClipboardCopy size="1.3rem" />
        </IconButton>
      </Heading>

      <Description user={user} />

      {
        // Faire un map des tools
      }
      {/* <ToolSelector /> */}
    </Box>
  );
}

export default Profil;
