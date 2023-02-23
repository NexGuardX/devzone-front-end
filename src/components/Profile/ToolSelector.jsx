import { Flex, FormLabel, Img, Switch } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeToolsUser, setToolsUser } from '../../features/user/userSlice';

function ToolSelector({ tool, userTools }) {
  const dispatch = useDispatch();
  // je cherche si l'utilisateur a des tools activé

  const findTools = userTools.find((userTool) => userTool === tool.id);

  const handleSwitchChange = () => {
    if (findTools) {
      // if the tool is found in the user's state, filter makes new array without the selected tool
      const newTools = userTools.filter((userTool) => userTool !== tool.id);
      dispatch(removeToolsUser(newTools));
    } else if (!findTools) {
      // if tool is not in the user's state, add it
      const newTools = [...userTools, tool.id];
      dispatch(setToolsUser(newTools));
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      p="0.5rem 2rem"
      marginX="1rem"
      borderBottom="1px solid #ddd"
      w={{ base: '100%', md: '60%' }}
    >
      <Img src={tool.logo} w={{ base: '30px', md: '40px' }} />
      <FormLabel value={tool.id}>{tool.name}</FormLabel>
      {findTools ? (
        <Switch onChange={handleSwitchChange} value={tool.id} defaultChecked />
      ) : (
        <Switch onChange={handleSwitchChange} value={tool.id} isInvalid />
      )}
    </Flex>
  );
}

ToolSelector.propTypes = {
  userTools: PropTypes.arrayOf(PropTypes.number),
  tool: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
};

ToolSelector.defaultProps = {
  userTools: [],
};

export default ToolSelector;
