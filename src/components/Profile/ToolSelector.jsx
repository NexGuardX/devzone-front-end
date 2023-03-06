import { Flex, FormLabel, Img, Switch, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

function ToolSelector({ tool, userCategory }) {
  const dispatch = useDispatch();

  if (typeof userCategory.tools === 'undefined') {
    return null;
  }

  const userTools = userCategory.tools;
  console.log('userCategory', userCategory);

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

  return (
    <VStack>
      <Flex justifyContent="space-between" p="0.5rem 2rem" w={{ base: '100%', md: '60%' }}>
        <Img src={tool.icon} w={{ base: '30px', md: '40px' }} />
        <FormLabel value={tool.id}>{tool.name}</FormLabel>
        {findTools ? (
          <Switch onChange={handleSwitchChange} value={tool.id} defaultChecked />
        ) : (
          <Switch onChange={handleSwitchChange} value={tool.id} isInvalid />
        )}
      </Flex>
      <Text marginBottom="0.5rem" fontSize="0.8rem">
        {tool.description}
      </Text>
    </VStack>
  );
}

ToolSelector.propTypes = {
  userCategory: PropTypes.shape({
    tools: PropTypes.arrayOf(PropTypes.string),
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
