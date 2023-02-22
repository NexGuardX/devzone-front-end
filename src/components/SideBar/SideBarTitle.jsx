import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function SideBarTitle({ text }) {
  return (
    <Text display={{ base: 'none', lg: 'initial' }} fontWeight="bold" fontSize="xs" pt="0.5rem">
      {text}
    </Text>
  );
}

SideBarTitle.propTypes = {
  text: PropTypes.string.isRequired,
};
