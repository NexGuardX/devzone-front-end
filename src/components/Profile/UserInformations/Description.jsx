import { Box, Flex, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsBoxArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Description({ user }) {
  return (
    <Box margin="0.8rem" textAlign="left">
      <Heading as="h3" fontSize="1.5rem" m="0.3rem">
        {user.firstname} {user.lastname}
      </Heading>
      <Box m="0.3rem">
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
      </Box>
    </Box>
  );
}

Description.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Description;
