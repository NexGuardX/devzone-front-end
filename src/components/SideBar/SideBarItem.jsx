import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentToolId } from '../../features/bookmarks/bookmarksSlice';

export default function SideBarItem({ toolId, icon, text, to, openSearchModal }) {
  const dispatch = useDispatch();
  return (
    <NavLink to={to} onClick={() => dispatch(setCurrentToolId(toolId))}>
      <Tooltip label={text} placement="right" display={{ md: 'initial', lg: 'none' }}>
        <HStack onClick={openSearchModal}>
          <Icon boxSize={{ md: 10, lg: 5 }} as={icon} />
          <Text display={{ md: 'none', lg: 'initial' }}>{text}</Text>
        </HStack>
      </Tooltip>
    </NavLink>
  );
}

SideBarItem.propTypes = {
  toolId: PropTypes.number.isRequired,
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  openSearchModal: PropTypes.func,
};

SideBarItem.defaultProps = {
  openSearchModal: null,
};
