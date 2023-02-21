import {
  Button,
  Center,
  CloseButton,
  Flex,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { RxHamburgerMenu, RxPerson } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/devzone.png';

function NavBar() {
  return (
    <Flex justifyContent="space-between">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu application"
          display={{ base: 'block', lg: 'none' }}
          w="100%"
          h="70px"
        >
          <Center>
            <RxHamburgerMenu size="2rem" />
          </Center>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <NavLink to="/app">DevZone</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/">HOME</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/app/news">NEWS</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/app/search">SEARCH</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/app/playground">PLAYGROUND</NavLink>
          </MenuItem>
          <CloseButton />
        </MenuList>
      </Menu>

      {/* DESTKOP & GRAND ECRAN */}
      <Menu>
        <Button w="100%" h="70px" display={{ base: 'none', lg: 'block' }}>
          <NavLink to="/">HOME</NavLink>
        </Button>
        <Button w="100%" h="70px" display={{ base: 'none', lg: 'block' }}>
          <NavLink to="/app">APP</NavLink>
        </Button>
      </Menu>

      <Button w="100%" h="70px">
        <NavLink to="/app">
          <Img src={logo} h="70px" />
        </NavLink>
      </Button>

      {/* MOBILE & TABLETTE */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu application"
          display={{ base: 'block', lg: 'none' }}
          w="100%"
          h="70px"
        >
          <Center>
            <RxPerson size="2rem" />
          </Center>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <NavLink to="/">DevZone</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/login">LOGIN</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/signup">SIGNUP</NavLink>
          </MenuItem>
          <CloseButton />
        </MenuList>
      </Menu>

      {/* DESTKOP & GRAND ECRAN */}
      <Menu>
        <Button w="100%" h="70px" display={{ base: 'none', lg: 'block' }}>
          <NavLink to="/login">LOGIN</NavLink>
        </Button>
        <Button w="100%" h="70px" display={{ base: 'none', lg: 'block' }}>
          <NavLink to="/signup">SIGNUP</NavLink>
        </Button>
      </Menu>
    </Flex>
  );
}

export default NavBar;
