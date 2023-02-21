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
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logodevzone from '../../assets/images/devzone.png';
import logodz from '../../assets/images/logo-dz.png';

function NavBar() {
  const user = useSelector((state) => state.user.username);

  return (
    <Flex justifyContent="space-between">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu application"
          display={{ base: 'block', md: 'none' }}
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
        <Button w="100%" h="70px" display={{ base: 'none', md: 'block' }}>
          <NavLink to="/">HOME</NavLink>
        </Button>
        <Button w="100%" h="70px" display={{ base: 'none', md: 'block' }}>
          <NavLink to="/app">APP</NavLink>
        </Button>
      </Menu>

      <Button w="100%" h="70px">
        <NavLink to="/app">
          <Img src={logodevzone} h="70px" display={{ base: 'none', md: 'block' }} />
          <Img src={logodz} h="70px" display={{ base: 'block', md: 'none' }} />
        </NavLink>
      </Button>

      {/* MOBILE & TABLETTE */}

      {user ? (
        <Button w="100%" h="70px" display={{ base: 'block', md: 'none' }}>
          <NavLink to="/profil">Welcome {user} !</NavLink>
        </Button>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu application"
            display={{ base: 'block', md: 'none' }}
            w="100%"
            h="70px"
          >
            <Center>
              <RxPerson size="2rem" />
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/app">DevZone</NavLink>
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
      )}

      {/* DESTKOP & GRAND ECRAN */}

      {user ? (
        <Button w="100%" h="70px" display={{ base: 'none', md: 'block' }}>
          <NavLink to="/profil">Welcome {user} !</NavLink>
        </Button>
      ) : (
        <Menu>
          <Button w="100%" h="70px" display={{ base: 'none', md: 'block' }}>
            <NavLink to="/login">LOGIN</NavLink>
          </Button>
          <Button w="100%" h="70px" display={{ base: 'none', md: 'block' }}>
            <NavLink to="/signup">SIGNUP</NavLink>
          </Button>
        </Menu>
      )}
    </Flex>
  );
}

export default NavBar;
