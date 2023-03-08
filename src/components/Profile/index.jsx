import { Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsGear } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCategoriesWithTools } from '../../features/tools/toolsSlice';
import { thunkGetUserCategories } from '../../features/user/userSlice';
import UserInformations from './UserInformations';

function Profile() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const user = useSelector((state) => state.user);

  const userCategories = useSelector((state) => state.user.categories);

  const categoriesWithTools = useSelector((state) => state.tools.categories);

  useEffect(() => {
    dispatch(thunkGetUserCategories({ userId }));
    dispatch(thunkCategoriesWithTools());
  }, [userId]);

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
        {/* {categoriesWithTools.map((category) =>
          category.tools[0] === null ? null : (
            <CategoryItem key={category.id} category={category} userCategories={userCategories} />
          )
        )} */}
      </Flex>
    </Flex>
  );
}

export default Profile;
