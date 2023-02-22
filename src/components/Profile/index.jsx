import { Box, Flex, Heading, IconButton, Img } from '@chakra-ui/react';
import { RxClipboardCopy } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import Description from './Description';
import ToolSelector from './ToolSelector';

function Profile() {
  const user = useSelector((state) => state.user);
  const tools = useSelector((state) => state.tools.tools);
  return (
    <Box textAlign="center">
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
      <Flex flexDirection="column">
        {tools.map((tool) => (
          <ToolSelector key={tool.id} tool={tool} userTools={user.tools} />
        ))}
      </Flex>
    </Box>
  );
}

export default Profile;
