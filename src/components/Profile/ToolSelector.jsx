/* eslint-disable react/forbid-prop-types */
import { Flex, FormLabel, Img, Switch, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  thunkAddToolsToUser,
  thunkGetUserCategories,
  thunkRemoveToolsToUser,
} from '../../features/user/userSlice';

function ToolSelector({ tool, userCategory }) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');
  const userCategories = useSelector((state) => state.user.categories);

  const userTools = userCategory.tools;
  console.log('userTools', userTools);
  userTools.map((userTool) => console.log(userTool));

  // search if user have active tools
  const findTools = userTools.find((userTool) => userTool.id === tool.id);
  console.log('findTools', findTools);

  const handleSwitchChange = (event) => {
    const toolId = event.target.value;

    if (event.target.checked === false) {
      dispatch(thunkRemoveToolsToUser({ userId, toolId }));
    } else if (event.target.checked === true) {
      dispatch(thunkAddToolsToUser({ userId, toolId }));
    }
  };

  useEffect(() => {
    if (userTools.length === 0) {
      const toolId = tool.id;
      dispatch(thunkAddToolsToUser({ userId, toolId }));
      console.log("j'ajoute le tool :", toolId);
      dispatch(thunkGetUserCategories({ userId }));
    }

    console.log('dans useEffect', userCategory);
  }, [userCategories, findTools]);

  function isCheck() {
    // if (typeof userCategories.tools === 'undefined') {
    //   return <Switch onChange={handleSwitchChange} value={tool.id} defaultChecked />;
    // }
    return findTools ? (
      <Switch onChange={handleSwitchChange} value={tool.id} defaultChecked />
    ) : (
      <Switch onChange={handleSwitchChange} value={tool.id} isInvalid />
    );
  }
  return (
    <VStack>
      <Flex justifyContent="space-between" w="300px" p="0.5rem">
        <Img src={tool.icon} w={{ base: '30px', md: '40px' }} />
        <FormLabel value={tool.id} marginBottom="0">
          {tool.name}
        </FormLabel>
        {isCheck()}
      </Flex>
      <Text margin="0" fontSize="0.8rem">
        {tool.description}
      </Text>
    </VStack>
  );
}

ToolSelector.propTypes = {
  userCategory: PropTypes.shape({
    tools: PropTypes.arrayOf(PropTypes.object),
  }),
  tool: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

ToolSelector.defaultProps = {
  userCategory: {
    tools: [],
  },
};

export default ToolSelector;
