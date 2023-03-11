import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  // eslint-disable-next-line prettier/prettier
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { thunkLogin } from '../../features/user/userSlice';
import GithubAuthButton from '../GithubAuthButton/index';

function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchResponse = useSelector((state) => state.user.response);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(thunkLogin({ emailOrUsername, password }));
  };

  useEffect(() => {
    if (fetchResponse === 200) {
      setEmailOrUsername('');
      setPassword('');
      navigate('/app');
    }
  }, [fetchResponse]);

  const handleEmailOrUsernameInput = (e) => setEmailOrUsername(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  return (
    <Flex minH="80dvh" align="center" justify="center">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Login to your account
          </Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          {location.state?.message && (
            <Text color="green" align="center">
              {location.state?.message}
            </Text>
          )}
          {fetchResponse !== 'Created' && (
            <Text color="red" align="center">
              {fetchResponse}
            </Text>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between"
              />
              <FormControl isRequired>
                <FormLabel>Email address or Username</FormLabel>
                <Input type="text" onChange={handleEmailOrUsernameInput} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handlePasswordInput} />
              </FormControl>
              <Button
                type="submit"
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Login
              </Button>
              <Text align="center">or</Text>
              <GithubAuthButton />
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
