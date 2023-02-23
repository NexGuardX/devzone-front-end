import { Flex, Heading } from '@chakra-ui/react';
import { BsGear } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import ToolSelector from './ToolSelector';
import UserInformations from './UserInformations';

function Profile() {
  const user = useSelector((state) => state.user);
  const tools = useSelector((state) => state.tools.tools);
  return (
    <Flex textAlign="center" flexDirection={{ base: 'column', md: 'row' }}>
      <UserInformations user={user} />

      <Flex
        flexGrow="1"
        margin={{ base: '0', md: '1rem' }}
        marginTop={{ base: '0', md: '2rem' }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flex alignItems="baseline">
          <BsGear size="2rem" />
          <Heading m="1rem" as="h2">
            My tools
          </Heading>
        </Flex>

        {tools.map((tool) => (
          <ToolSelector key={tool.id} tool={tool} userTools={user.tools} />
        ))}
      </Flex>
    </Flex>
  );
}

export default Profile;
