import { Box, Card, HStack, Link } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchUserOrgs } from '../../features/github/githubSlice';
import PageTitle from '../PageTitle';

export default function GithubOrgs() {
  const dispatch = useDispatch();
  const orgs = useSelector((state) => state.github.orgs);
  const token = useSelector((state) => state.user.githubToken);

  useEffect(() => {
    dispatch(thunkFetchUserOrgs());
  }, [token]);

  if (!token) {
    return <div>NO TOKEN</div>;
  }

  return (
    <Box p="2rem">
      <PageTitle text="Organizations" />

      <Box>
        {orgs.map((org) => (
          <Card p="0.5rem" mb="0.5rem" key={org.id}>
            <HStack>
              <Link href={`https://github.com/${org.login}`} target="_blank">
                {org.login}
              </Link>
            </HStack>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
