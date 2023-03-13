import { Box, Card, Flex, HStack, IconButton, Link, Tag, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BiCopy } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMessage } from '../../features/application/applicationSlice';
import { thunkFetchUserRepos } from '../../features/github/githubSlice';
import PageTitle from '../PageTitle';
import RepoStatsModal from './RepoStatsModal';

export default function GithubRepos() {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.github.repos);
  const token = useSelector((state) => state.user.githubToken);

  const handleClickCopy = (text) => () => {
    navigator.clipboard.writeText(text);
    dispatch(setToastMessage({ title: 'SSH clone URL copied' }));
  };

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
          <Card p="0.5rem" mb="0.5rem" key={repo.id} _hover={{ outline: '1px solid' }}>
            <Flex justifyContent="space-between">
              <HStack>
                <Link fontWeight="bold" href={repo.svn_url} target="_blank">
                  {repo.name}
                </Link>
              </HStack>
              <HStack>
                <Tag size="sm" colorScheme="cyan">
                  {repo.visibility}
                </Tag>
                <Tag size="sm">
                  last update {new Date(Date.parse(repo.pushed_at)).toLocaleDateString()}
                </Tag>
                <RepoStatsModal repo={repo} />

                <Box display={{ base: 'none', md: 'block' }}>
                  <Tooltip label="Copy SSH" hasArrow placement="top">
                    <IconButton
                      variant="ghost"
                      icon={<BiCopy />}
                      onClick={handleClickCopy(repo.ssh_url)}
                    />
                  </Tooltip>
                </Box>
              </HStack>
            </Flex>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
