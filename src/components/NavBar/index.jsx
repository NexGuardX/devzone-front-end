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
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logodevzoneblack from '../../assets/images/devzoneblack.png';
import logodz from '../../assets/images/logo-dz.png';
import { logout } from '../../features/user/userSlice';

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate('/');
    dispatch(logout());
  };

  return (
    <Flex justifyContent="space-between">
      <Flex width="100%" justifyContent="space-between">
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
      </Flex>
      <Button w="100%" h="70px">
        <NavLink to="/app">
          <Img src={logodevzoneblack} h="70px" display={{ base: 'none', md: 'block' }} />
          <Img src={logodz} h="70px" display={{ base: 'block', md: 'none' }} />
        </NavLink>
      </Button>

      {/* MOBILE & TABLETTE */}

      {user ? (
        <Menu>
          <MenuButton
            aria-label="User menu"
            display={{ base: 'block', md: 'none' }}
            w="100%"
            h="70px"
          >
            <Center>{user}</Center>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/profile">Profile</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/logout">LogOut</NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
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
        <Menu>
          <MenuButton
            aria-label="User menu"
            minW="300px"
            w="100%"
            h="70px"
            display={{ base: 'none', md: 'block' }}
          >
            <Center>Welcome {user} !</Center>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/profile">Profile</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClick}>LogOut</MenuItem>
          </MenuList>
        </Menu>
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
