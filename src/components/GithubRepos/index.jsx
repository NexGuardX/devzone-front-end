import { Box, Card, HStack, Link, Tag, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchUserRepos } from '../../features/github/githubSlice';
import PageTitle from '../PageTitle';
import RepoStatsModal from './RepoStatsModal';

export default function GithubRepos() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.github.repos);
  const token = useSelector((state) => state.user.githubToken);

  useEffect(() => {
    dispatch(thunkFetchUserRepos());
  }, [token]);

  if (!token) {
    return <div>NO TOKEN</div>;
  }

  return (
    <Box p="2rem">
      <PageTitle text="Repositories" />

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
    </Box>
  );
}
