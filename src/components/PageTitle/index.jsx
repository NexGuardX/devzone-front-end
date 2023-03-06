import { Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function PageTitle({ text }) {
  return (
    <Heading as="h1" pb="2rem">
      {text}
    </Heading>
  );
}

PageTitle.propTypes = {
  text: PropTypes.string.isRequired,
};
