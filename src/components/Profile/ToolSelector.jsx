import { Flex, FormLabel, Img, Switch } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeToolsUser, setToolsUser } from '../../features/user/userSlice';

function ToolSelector({ tool, userTools }) {
  const dispatch = useDispatch();
  // je cherche si l'utilisateur a des tools désactivé

  const findTools = userTools.find((userTool) => userTool === tool.id);

  // if (findTools.length === 0) {
  //   console.log('findTools is empty');
  // } else {
  //   console.log('findTools has', findTools.length);
  // }

  // const handleRemoveTool = () => {
  //   // je filtre les Tools désactivé pour enlever du state celui que l'utilisateur active
  //   const newTools = userTools.filter((userTool) => userTool !== tool.id);
  //   dispatch(removeToolsUser(newTools));
  // };

  // const handleAddTool = () => {
  //   // J'ajoute le tool au state pour le désactiver
  //   // const newTools = userTools.push(tool.id);
  //   console.log('userTools', userTools);
  //   console.log('tool.id', tool.id);
  //   // console.log('newTools', newTools);
  //   dispatch(setToolsUser(tool.id));
  // };

  const handleSwitchChange = () => {
    if (findTools) {
      const newTools = userTools.filter((userTool) => userTool !== tool.id);
      dispatch(removeToolsUser(newTools));
    } else if (!findTools) {
      console.log('ajoute le tool', tool.id);
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
    >
      <Img src={tool.logo} w="30px" />
      <FormLabel value={tool.id}>{tool.name}</FormLabel>
      {findTools ? (
        <Switch onChange={handleSwitchChange} value={tool.id} isInvalid />
      ) : (
        <Switch onChange={handleSwitchChange} value={tool.id} defaultChecked />
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
