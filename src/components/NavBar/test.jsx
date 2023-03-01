import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import logodevzoneblack from '../../assets/images/devzoneblack.png';
import logodz from '../../assets/images/logo-dz.png';

// eslint-disable-next-line react/prop-types
// function NavLinkK({ children }) {
//   return (
//     <NavLink
//       px={2}
//       py={1}
//       rounded="md"
//       _hover={{
//         textDecoration: 'none',
//         bg: useColorModeValue('gray.200', 'gray.700'),
//       }}
//       href="#"
//     >
//       {children}
//     </NavLink>
//   );
// }

export default function Simple() {
  const [burgerMenu, setBurgerMenu] = useState();

  return (
    <Box bg={useColorModeValue('blue.100', 'blue.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton size="md" aria-label="Open Menu" display={{ md: 'none' }} />
        <HStack spacing={8} alignItems="center">
          <NavLink to="/app">
            <Img src={logodevzoneblack} h="70px" display={{ base: 'none', md: 'block' }} />
            <Img src={logodz} h="70px" display={{ base: 'block', md: 'none' }} />
          </NavLink>
        </HStack>
        <Flex alignItems="center">
          <Menu>
            <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
              <Avatar
                size="sm"
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Flex>
        <Menu>
          <MenuButton
            // eslint-disable-next-line no-shadow
            onClick={() => setBurgerMenu((burgerMenu) => !burgerMenu)}
            display={{ base: 'block', md: 'none' }}
          >
            {burgerMenu ? <RxHamburgerMenu size="2rem" /> : <GrClose size="2rem" />}
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
    </Box>
  );
}
