/* eslint-disable no-shadow */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  // eslint-disable-next-line prettier/prettier
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setFetchResponse, thunkSignup } from '../../features/user/userSlice';
import GithubAuthButton from '../GithubAuthButton/index';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [Error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmedPasswordInput = (e) => setConfirmedPassword(e.target.value);

  const fetchResponse = useSelector((state) => state.user.response);

  const dispatch = useDispatch();

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordMatch = password === confirmedPassword;
    if (!isPasswordMatch) {
      return setError('Confirm password should match password');
    }
    const isValidPassword = validatePassword(password);

    if (!isValidPassword) {
      return setError(
        'Password must contain 8 characters, at least one letter, one number and a special character.'
      );
    }
    setError('');
    dispatch(thunkSignup({ username, email, password, confirmedPassword }));
  };

  useEffect(() => {
    if (fetchResponse === 'Created') {
      // navigate('/login', {
      //   state: {
      //     message:
      //       'An email has been sent to you, click on the link and you will be able to connect',
      //   },
      // });
      onOpen();
      dispatch(setFetchResponse(''));
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmedPassword('');
    }
  }, [fetchResponse]);

  return (
    <Flex minH="80vh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          {fetchResponse !== 201 && (
            <Text color="red" align="center">
              {fetchResponse}
            </Text>
          )}

          <form onSubmit={handleSubmit} spacing={4}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" minLength="2" onChange={handleUsernameInput} />
            </FormControl>
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
                    p="0.3rem"
                    variant="ghost"
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <IoEyeOutline size="1rem" /> : <IoEyeOffOutline size="1rem" />}
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
                    p="0.3rem"
                    variant="ghost"
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <IoEyeOutline size="1rem" /> : <IoEyeOffOutline size="1rem" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text color="red" align="center">
                {Error}
              </Text>
            </FormControl>
            <Stack spacing={4} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign up
              </Button>
              <Text align="center">or</Text>
              <GithubAuthButton />
            </Stack>
            <Stack pt={6}>
              <Text align="center">Already a user?</Text>
              <Link color="blue.500" textAlign="center" as={NavLink} to="/login">
                Login
              </Link>
            </Stack>
          </form>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter="blur(2px)" />
          <ModalContent>
            <ModalHeader fontSize="4xl">Congratulations</ModalHeader>
            <ModalBody>
              <Text fontWeight="bold" mb="1rem" fontSize="xl">
                We have sent you a verification e-mail.
              </Text>
              <Text>
                Please verify your account via the link in the e-mail and complete registration.
              </Text>
              <br />
              <Text>
                If you don&apos;t receive an email from us, please check your spam folder or
              </Text>
              <br />
              <Text fontWeight="bold">
                <NavLink to="/contact">contact customer support.</NavLink>
              </Text>
            </ModalBody>

            <ModalFooter>
              <NavLink to="/login">
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Sign In
                </Button>
              </NavLink>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </Flex>
  );
}
