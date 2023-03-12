import { Avatar, Box, Card, Flex, HStack, IconButton, Link, Tooltip } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import { GoRepo } from 'react-icons/go';
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
          <Card p="0.5rem" mb="0.5rem" key={org.id} _hover={{ outline: '1px solid' }}>
            <Flex justifyContent="space-between">
              <HStack>
                <Avatar src={org.avatar_url} name={org.login} />
                <Link fontWeight="bold" href={`https://github.com/${org.login}`} target="_blank">
                  {org.login}
                </Link>
              </HStack>
              <HStack>
                <Tooltip label="Repositories" hasArrow placement="top">
                  <Link
                    fontWeight="bold"
                    href={`https://github.com/orgs/${org.login}/repositories`}
                    target="_blank"
                  >
                    <IconButton variant="ghost" icon={<GoRepo />} />
                  </Link>
                </Tooltip>

                <Tooltip label="Teams" hasArrow placement="top">
                  <Link
                    fontWeight="bold"
                    href={`https://github.com/orgs/${org.login}/teams`}
                    target="_blank"
                  >
                    <IconButton variant="ghost" icon={<AiOutlineTeam />} />
                  </Link>
                </Tooltip>

                <Tooltip label="Link" hasArrow placement="top">
                  <Link fontWeight="bold" href={`https://github.com/${org.login}`} target="_blank">
                    <IconButton variant="ghost" icon={<FiExternalLink />} />
                  </Link>
                </Tooltip>
              </HStack>
            </Flex>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
