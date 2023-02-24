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
  InputRightElement,
  Stack,
  Text,
  // eslint-disable-next-line prettier/prettier
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { thunkSignup } from '../../features/user/userSlice';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isError, setIsError] = useState('');

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmedPasswordInput = (e) => setConfirmedPassword(e.target.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordMatch = password === confirmedPassword;
    if (!isPasswordMatch) {
      setIsError('Confirm password should match password');
      return;
    }
    dispatch(thunkSignup({ username, email, password, confirmedPassword }));

    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmedPassword('');
    navigate('/login');
  };

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
          <form onSubmit={handleSubmit} spacing={4}>
            <HStack>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={handleUsernameInput} />
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleEmailInput} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={handlePasswordInput} />
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
            <FormControl isRequired>
              <FormLabel>Confirm your password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleConfirmedPasswordInput}
                />
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
            <Text color="red" align="center">
              {isError}
            </Text>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
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
                Already a user?
                <NavLink to="/login">
                  <Text color="blue.400">Login</Text>
                </NavLink>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
