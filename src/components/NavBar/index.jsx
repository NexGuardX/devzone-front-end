import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsBoxArrowInRight } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { RxHamburgerMenu, RxPerson } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logodevzoneblack from '../../assets/images/devzoneblack.png';
import logodz from '../../assets/images/logo-dz.png';
import { logout, thunkGetUser } from '../../features/user/userSlice';

function NavBar() {
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');

  // if userId in localstorage, find the user in db to maintain the connection
  useEffect(() => {
    if (userId) {
      dispatch(thunkGetUser({ userId }));
    }
  }, [userId]);

  const [burgerMenu, setBurgerMenu] = useState();

  const handleClick = () => {
    // remove accessToken & userId from localstorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    dispatch(logout());
  };

  return (
    <Flex
      position="sticky"
      top="0"
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
      <Box>
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
      </Box>

      {/* DESTKOP & GRAND ECRAN --- BurgerMenu */}
      <Box display={{ base: 'none', md: 'block' }}>
        <NavLink to="/app">
          <Button bg="gray.400" rightIcon={<BsBoxArrowInRight />}>
            App
          </Button>
        </NavLink>
      </Box>
      <Spacer />
      <NavLink to="/">
        <Img src={logodevzoneblack} h="60px" display={{ base: 'none', md: 'block' }} />
        <Img src={logodz} h="60px" display={{ base: 'block', md: 'none' }} />
      </NavLink>

      <Spacer />
      {/* MOBILE & TABLETTE -  Profile */}
      {user ? (
        <Menu>
          <MenuButton
            display={{ base: 'block', md: 'none' }}
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
            <NavLink to="/login">
              <MenuItem onClick={handleClick}>LogOut</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      ) : (
        <Menu p="2">
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
          <MenuButton display={{ base: 'none', md: 'block' }} rounded="full" variant="link">
            <Avatar size="md" name={user} src="" />
          </MenuButton>
          <MenuList>
            <NavLink to="/profile">
              <MenuItem>Profile</MenuItem>
            </NavLink>
            <NavLink to="/login">
              <MenuItem onClick={handleClick}>LogOut</MenuItem>
            </NavLink>
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={6}>
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
        </HStack>
      )}
    </Flex>
  );
}

export default NavBar;
