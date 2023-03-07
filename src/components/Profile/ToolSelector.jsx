/* eslint-disable react/forbid-prop-types */
import { Flex, FormLabel, Img, Switch, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

function ToolSelector({ tool, userCategory }) {
  const dispatch = useDispatch();

  const userCategories = useSelector((state) => state.user.categories);
  console.log(userCategories);

  if (typeof userCategory.tools === 'undefined') {
    return null;
  }

  const userTools = userCategory.tools;

  // search if user have active tools
  const findTools = userTools.find((userTool) => userTool.id === tool.id);

  const handleSwitchChange = () => {
    // if (findTools) {
    //   // if the tool is found in the user's state, filter makes new array without the selected tool
    //   const newTools = userTools.filter((userTool) => userTool.id !== tool.id);
    //   dispatch(removeToolsUser(newTools));
    // } else if (!findTools) {
    //   // if tool is not in the user's state, add it
    //   const newTools = [...userTools, tool];
    //   dispatch(setToolsUser(newTools));
    // }
    console.log('je change');
  };

  function isCategories() {
    if (typeof userCategories.tools === 'undefined') {
      return <Switch onChange={handleSwitchChange} value={tool.id} defaultChecked />;
    }
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
        {isCategories()}
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
