import { Box, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SideBarItem({ icon, text, to, openSearchModal }) {
  return (
    <NavLink to={to}>
      <Box ps="1rem" pe={{ base: '1rem', lg: '3rem' }} py="0.5rem" _hover={{ bg: 'lightgray' }}>
        <Tooltip label={text} placement="right" display={{ md: 'initial', lg: 'none' }}>
          <HStack onClick={openSearchModal}>
            <Icon boxSize={{ md: 10, lg: 5 }} as={icon} />
            <Text display={{ md: 'none', lg: 'initial' }}>{text}</Text>
          </HStack>
        </Tooltip>
      </Box>
    </NavLink>
  );
}

SideBarItem.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  openSearchModal: PropTypes.func,
};

SideBarItem.defaultProps = {
  openSearchModal: null,
};
