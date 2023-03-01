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
            <MenuItem>
              <NavLink to="/">Home</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/app/news">News</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/app/search">Search</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/app/playground-js">Javascript</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/app/playground-html">HTML</NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* DESTKOP & GRAND ECRAN --- BurgerMenu */}

      <Flex width="100%" justifyContent="flex-start">
        <NavLink to="/app" display={{ base: 'left', md: 'center' }}>
          <Img src={logodevzoneblack} h="60px" display={{ base: 'none', md: 'block' }} />
          <Img src={logodz} h="60px" display={{ base: 'block', md: 'none' }} />
        </NavLink>
      </Flex>

      {/* MOBILE & TABLETTE -  Profile */}

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
          >
            <Center>
              <RxPerson size="2rem" />
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/login">Sign in</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/signup">Sign up</NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      {/* DESTKOP & GRAND ECRAN --- Profile */}

      {user ? (
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
            display={{ base: 'none', md: 'block' }}
          >
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            />
            {/* Welcome {user} */}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <NavLink to="/profile">Profile</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClick}>LogOut</MenuItem>
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
          >
            <NavLink to="/login">Sign In</NavLink>
          </Button>
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
            <NavLink to="/signup">Sign Up</NavLink>
          </Button>
        </Stack>
      )}
    </Flex>
  );
}

export default NavBar;
