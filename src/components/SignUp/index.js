/* eslint-disable no-shadow */

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement, Stack,
  Text,
  // eslint-disable-next-line prettier/prettier
  useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <HStack>
              <FormControl id="pseudo">
                <FormLabel>Pseudo</FormLabel>
                <Input type="text" />
              </FormControl>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <IoEyeOutline size="2rem" /> : <IoEyeOffOutline size="2rem" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align="center">
                Already a user?{' '}
                <NavLink color="blue.400" to="/login">
                  Login
                </NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
