import { Box, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Description({ user }) {
  return (
    <Box margin="0.8rem" textAlign="left">
      <Heading as="h3" fontSize="1.5rem" m="0.3rem">
        {user.firstname} {user.lastname}
      </Heading>
      <Box m="0.3rem">
        <Heading as="h3" fontSize="1.3rem" fontWeight="400">
          Website
        </Heading>
        <Link to={user.website} target="_blank">
          {user.website}
        </Link>
      </Box>
      <Box m="0.3rem">
        <Heading as="h3" fontSize="1.3rem" fontWeight="400">
          Email
        </Heading>
        {user.email}
      </Box>
      <Box m="0.3rem">{user.description}</Box>
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
