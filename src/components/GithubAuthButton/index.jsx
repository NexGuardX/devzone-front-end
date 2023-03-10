import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { GoMarkGithub } from 'react-icons/go';

const {
  REACT_APP_GITHUB_OAUTH_CLIENT_ID: CLIENT_ID,
  REACT_APP_GITHUB_OAUTH_REDIRECT_URI: REDIRECT_URI,
} = process.env;

const SCOPE = 'read:user,user:email,read:org';
const REDIRECT_PATH = '/auth/github';
const GITHUB_REQUEST_IDENTY_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}${REDIRECT_PATH}`;

export default function GithubAuthButton() {
  const handleClick = () => {
    window.location.href = GITHUB_REQUEST_IDENTY_URL;
  };

  return (
    <Button bg="blackAlpha.800" _hover={{ bg: 'black' }} onClick={handleClick}>
      <HStack color="white">
        <Text>Continue with GitHub</Text>
        <Icon as={GoMarkGithub} />
      </HStack>
    </Button>
  );
}
