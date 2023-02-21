import { Flex, FormLabel, Img, Switch } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeToolsUser } from '../../features/user/userSlice';

function ToolSelector({ tool, userTools }) {
  const dispatch = useDispatch();
  // je cherche si l'utilisateur a des tools désactivé
  const findTools = userTools.find((userTool) => userTool === tool.id);
  console.log('findTools', findTools);
  const handleRemoveTool = () => {
    // je filtre les Tools désactivé pour enlever du state celui que l'utilisateur active
    const newTools = userTools.filter((userTool) => userTool !== tool.id);
    dispatch(removeToolsUser(newTools));
  };

  useEffect(() => {
    console.log('userTools', userTools);
  }, [userTools]);
  const handleAddTool = (event) => {
    // J'ajoute le tool au state pour le désactiver
    // const newTools = userTools.push(event.target.value);
    console.log('userTools', userTools);
    // console.log('newTools', newTools);
    // dispatch(setToolsUser(newTools));
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
        <Switch onChange={handleRemoveTool} value={tool.id} isInvalid />
      ) : (
        <Switch onChange={handleAddTool} value={tool.id} defaultChecked />
      )}
    </Flex>
  );
}

ToolSelector.propTypes = {
  userTools: PropTypes.array.isRequired,
  tool: PropTypes.object.isRequired,
};

export default ToolSelector;
