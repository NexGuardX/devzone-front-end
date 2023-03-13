import { Flex, HStack, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { thunkAuthWithGithub } from '../../features/user/userSlice';

const { REACT_APP_GITHUB_OAUTH_REDIRECT_URI: REDIRECT_URI } = process.env;

export default function GithubCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Because of DEV Strictmode
  const executedOnce = useRef(false);

  useEffect(() => {
    if (!executedOnce.current) {
      dispatch(thunkAuthWithGithub({ code, redirectUri: REDIRECT_URI }))
        .then(() => navigate('/app/github-repos'))
        .catch(() => navigate('/login'));
    }
    executedOnce.current = true;
  }, []);

  return (
    <Flex width="100%" height="80dvh" justifyContent="center" alignItems="center">
      <VStack>
        <HStack fontSize={{ md: '2rem' }}>
          <Icon as={GoMarkGithub} />
          <Text>Github Authentication</Text>
          <Spinner size="lg" />
        </HStack>
      </VStack>
    </Flex>
  );
}
