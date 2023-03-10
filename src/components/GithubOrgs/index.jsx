import { Box, Card, HStack, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGithubData } from '../../common/helpers/github';
import PageTitle from '../PageTitle';

export default function GithubOrgs() {
  const [orgs, setOrgs] = useState([]);

  const token = useSelector((state) => state.user.githubToken);
  // const username = useSelector((state) => state.user.username);

  useEffect(() => {
    getGithubData({ path: '/user/orgs', token }).then((res) => setOrgs(res));
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
