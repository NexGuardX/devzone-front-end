import { Flex, HStack, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../common/helpers/api';
import { setUserInfos } from '../../features/user/userSlice';

const { REACT_APP_GITHUB_OAUTH_REDIRECT_URI: REDIRECT_URI } = process.env;

export default function GithubCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Because of DEV Strictmode
  const executedOnce = useRef(false);

  const getGithubToken = async (data) => {
    try {
      const response = await api.post('/auth/github', data);
      dispatch(setUserInfos(response.data));
      navigate('/app/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!executedOnce.current) {
      const redirectUri = `${REDIRECT_URI}`;
      getGithubToken({ code, redirectUri });
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
