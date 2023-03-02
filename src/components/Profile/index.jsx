import { Flex, Heading } from '@chakra-ui/react';
import { BsGear } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { thunkGetUser } from '../../features/user/userSlice';
import ToolSelector from './ToolSelector';
import UserInformations from './UserInformations';

function Profile() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const user = useSelector((state) => state.user);
  const tools = useSelector((state) => state.tools.tools);

  if (userId) {
    dispatch(thunkGetUser({ userId }));
  } else {
    // if no userID is registered in localStorage, we redirect to the login page
    return <Navigate to="/login" />;
  }

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
