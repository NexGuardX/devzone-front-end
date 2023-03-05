import { Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsGear } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCategoriesWithTools } from '../../features/tools/toolsSlice';
import { thunkGetUserCategories } from '../../features/user/userSlice';
import CategoryItem from './CategoryItem';
import UserInformations from './UserInformations';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const user = useSelector((state) => state.user);
  // const tools = useSelector((state) => state.tools.tools);

  const userCategories = useSelector((state) => state.user.tools);
  dispatch(thunkGetUserCategories());

  const categoriesWithTools = useSelector((state) => state.tools.categories);
  dispatch(thunkCategoriesWithTools());
  useEffect(() => {
    if (userId === null) {
      // if no userID is registered in localStorage, we redirect to the login page
      navigate('/login');
    }
  }, [categoriesWithTools, userCategories]);

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
        {categoriesWithTools.map((category) => (
          <CategoryItem key={category.id} category={category} userCategories={userCategories} />
        ))}

        {/* {tools.map((tool) => (
          <ToolSelector key={tool.id} tool={tool} userTools={user.tools} />
        ))} */}
      </Flex>
    </Flex>
  );
}

export default Profile;
