import { Box, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SideBarItem({ icon, text, to, openSearchModal }) {
  return (
    <NavLink to={to}>
      <Box
        ps="1rem"
        pe={{ base: '1rem', lg: '3rem' }}
        py="0.5rem"
        borderRadius="4px"
        _hover={{ outline: '1px solid' }}
      >
        <Tooltip
          label={text}
          placement="right"
          display={{ base: 'none', md: 'initial', lg: 'none' }}
        >
          <HStack onClick={openSearchModal}>
            <Icon boxSize={{ base: 8, md: 10, lg: 5 }} as={icon} />
            <Text
              display={{ md: 'none', lg: 'initial' }}
              fontSize={{ base: '2rem', md: 'none', lg: 'initial' }}
            >
              {text}
            </Text>
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
