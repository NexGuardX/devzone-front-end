import { Box, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentToolId } from '../../features/bookmarks/bookmarksSlice';

export default function SideBarItem({ toolId, icon, text, to, openSearchModal }) {
  const dispatch = useDispatch();
  return (
    <NavLink to={to} onClick={() => dispatch(setCurrentToolId(toolId))}>
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
  toolId: PropTypes.number,
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  openSearchModal: PropTypes.func,
};

SideBarItem.defaultProps = {
  openSearchModal: null,
  toolId: null,
};
