import { Box, Card, Heading, HStack, Link, Tag, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGithubData } from '../../common/helpers/github';
import PageTitle from '../PageTitle';
import RepoStatsModal from './RepoStatsModal';

export default function Dashboard() {
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  console.log('⏩ ~ Dashboard ~ repos:', repos);
  console.log('⏩ ~ Dashboard ~ orgs:', orgs);
  const token = useSelector((state) => state.user.githubToken);
  // const username = useSelector((state) => state.user.username);

  useEffect(() => {
    getGithubData({ path: '/user/repos', token }).then((res) => setRepos(res));
    getGithubData({ path: '/user/orgs', token }).then((res) => setOrgs(res));
  }, [token]);

  if (!token) {
    return <div>NO TOKEN</div>;
  }

  return (
    <Box p="2rem">
      <PageTitle text="Dashboard" />

      {/* REPOSITORIES */}
      <Heading as="h2" mb="1rem">
        Repositories
      </Heading>
      <Box>
        {repos.map((repo) => (
          <Card p="0.5rem" mb="0.5rem" key={repo.id}>
            <HStack>
              <Link href={repo.svn_url} target="_blank">
                {repo.name}
              </Link>
              <Tag>{repo.visibility}</Tag>
              <Text> last update {new Date(Date.parse(repo.pushed_at)).toLocaleDateString()}</Text>
              <RepoStatsModal repo={repo} />
            </HStack>
          </Card>
        ))}
      </Box>

      {/* ORGS */}
      <Heading as="h2" mb="1rem">
        Organizations
      </Heading>
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
