import { Button, Wrap, WrapItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <Wrap spacing="6" direction="column" display={{ base: 'none', md: 'block' }} p="10">
      <WrapItem>
        <NavLink to="/app/news">
          <Button justifyContent="start" w="150px">
            NEWS
          </Button>
        </NavLink>
      </WrapItem>
      <WrapItem>
        <NavLink w="130px" to="/app/search">
          <Button justifyContent="start" w="150px">
            SEARCH
          </Button>
        </NavLink>
      </WrapItem>
      <WrapItem>
        <NavLink to="/app/playground">
          <Button justifyContent="start" w="150px">
            PLAYGROUND
          </Button>
        </NavLink>
      </WrapItem>
    </Wrap>
  );
}

export default SideBar;
