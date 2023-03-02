import {
  Button,
  Center,
  Avatar,
  Flex,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { RxHamburgerMenu, RxPerson } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import logodevzoneblack from '../../assets/images/devzoneblack.png';
import logodz from '../../assets/images/logo-dz.png';
import { logout } from '../../features/user/userSlice';

function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const [burgerMenu, setBurgerMenu] = useState();
  const handleClick = () => {
    navigate('/');
    dispatch(logout());
  };

  return (
    <Flex
      bg={useColorModeValue('blue.900', 'blue.800')}
      minH="60px"
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align="center"
      h="70px"
    >
      {/* MOBILE & TABLETTE ---- BurgerMenu */}

      <Flex width="100%" justifyContent="flex-start">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu application"
            display={{ base: 'block', md: 'none' }}
            // eslint-disable-next-line no-shadow
            onClick={() => setBurgerMenu((burgerMenu) => !burgerMenu)}
          >
            <Center>
              {burgerMenu ? <RxHamburgerMenu size="2rem" /> : <GrClose size="2rem" />}
            </Center>
          </MenuButton>
          <MenuList>
            <NavLink to="/">
              <MenuItem>Home</MenuItem>
            </NavLink>
            <NavLink to="/app/news">
              <MenuItem>News</MenuItem>
            </NavLink>
            <NavLink to="/app/search">
              <MenuItem>Search</MenuItem>
            </NavLink>
            <NavLink to="/app/playground-js">
              <MenuItem>Javascript</MenuItem>
            </NavLink>
            <NavLink to="/app/playground-html">
              <MenuItem>HTML</MenuItem>
            </NavLink>
            <NavLink to="/contact">
              <MenuItem>Contact</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      </Flex>

      {/* DESTKOP & GRAND ECRAN --- BurgerMenu */}

      <Flex width="100%" alignContent="flex-start">
        <NavLink to="/">
          <Img src={logodevzoneblack} h="60px" display={{ base: 'none', md: 'block' }} />
          <Img src={logodz} h="60px" display={{ base: 'block', md: 'none' }} />
        </NavLink>
      </Flex>

      {/* MOBILE & TABLETTE -  Profile */}

      {user ? (
        <Menu>
          <MenuButton
            display={{ base: 'block', md: 'none' }}
            mx={6}
            as={IconButton}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
          >
            <Avatar size="md" name={user} src="" />
          </MenuButton>
          <MenuList>
            <NavLink to="/profile">
              <MenuItem>Profile</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem onClick={handleClick}>LogOut</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu application"
            display={{ base: 'block', md: 'none' }}
          >
            <Center>
              <RxPerson size="2rem" />
            </Center>
          </MenuButton>
          <MenuList>
            <NavLink to="/login">
              <MenuItem>Sign in</MenuItem>
            </NavLink>
            <NavLink to="/signup">
              <MenuItem>Sign up</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      )}

      {/* DESTKOP & GRAND ECRAN --- Profile */}

      {user ? (
        <Menu>
          <MenuButton
            display={{ base: 'none', md: 'block' }}
            mx={6}
            rounded="full"
            variant="link"
            minW={0}
          >
            <Avatar size="md" name={user} src="" />
          </MenuButton>
          <MenuList>
            <NavLink to="/profile">
              <MenuItem>Profile</MenuItem>
            </NavLink>
            <NavLink>
              <MenuItem onClick={handleClick}>LogOut</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      ) : (
        <Stack flex={{ base: 1, md: 0 }} justify="flex-end" direction="row" spacing={6}>
          <Button
            as="a"
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize="sm"
            fontWeight={400}
            variant="link"
            color="white"
          >
            <NavLink to="/login">Sign In</NavLink>
          </Button>
          <NavLink to="/signup">
            <Button
              as="a"
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="pink.400"
              _hover={{
                bg: 'pink.300',
              }}
            >
              Sign Up
            </Button>
          </NavLink>
        </Stack>
      )}
    </Flex>
  );
}

export default NavBar;
