import { Box, Button, Heading, IconButton, Img } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import { RxClipboardCopy } from 'react-icons/rx';
import Description from './Description';

function UserInformations({ user }) {
  return (
    <Box margin="1rem" w={{ base: '100%', md: '300px', lg: '400px' }}>
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
      <Button>
        Edit Profile <AiOutlineEdit size="1.3rem" />
      </Button>
    </Box>
  );
}
UserInformations.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
};
export default UserInformations;
