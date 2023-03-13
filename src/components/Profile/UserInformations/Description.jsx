import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function Description({ user }) {
  return (
    <Box margin="0.8rem" textAlign="left">
      <HStack>
        <Text fontSize="1rem">Firstname: </Text>{' '}
        <Heading as="h3" fontSize="1.2rem" fontWeight="400" m="0.3rem">
          {user.firstname}
        </Heading>
      </HStack>
      <HStack>
        <Text>Lastname: </Text>{' '}
        <Heading as="h3" fontSize="1.2rem" fontWeight="400" m="0.3rem">
          {user.lastname}
        </Heading>
      </HStack>

      {/* <Box m="0.3rem">
        <Link to={user.website} target="_blank">
          <Flex
            flexDirection="row"
            gap="0.3rem"
            alignItems="baseline"
            fontSize="1.3rem"
            fontWeight="400"
          >
            My website <BsBoxArrowRight size="0.9rem" />
          </Flex>
        </Link>
      </Box> */}
    </Box>
  );
}

Description.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};

export default Description;
