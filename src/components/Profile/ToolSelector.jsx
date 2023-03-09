/* eslint-disable react/forbid-prop-types */
import { Flex, FormLabel, Icon, Switch, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddToolToUser, thunkRemoveToolToUser } from '../../features/user/userSlice';

function ToolSelector({ tool, icon, isCheck }) {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  const [isChecked, setIsChecked] = useState(isCheck);

  const handleSwitchChange = (event) => {
    const toolId = event.target.value;

    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    if (newIsChecked === false) {
      dispatch(thunkRemoveToolToUser({ userId, toolId }));
    } else if (newIsChecked === true) {
      dispatch(thunkAddToolToUser({ userId, toolId }));
    }
  };

  useEffect(() => {
    setIsChecked(isCheck);
  }, [isCheck]);

  return (
    <VStack>
      <Flex justifyContent="space-between" alignItems="center" w="300px" p="0.5rem">
        <Icon as={icon} boxSize={{ base: 7 }} />
        <FormLabel value={tool.id} marginBottom="0">
          {tool.name}
        </FormLabel>
        <Switch onChange={handleSwitchChange} isChecked={isCheck} value={tool.id} />
      </Flex>
      <Text margin="0" fontSize="0.8rem">
        {tool.description}
      </Text>
    </VStack>
  );
}

ToolSelector.propTypes = {
  tool: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  icon: PropTypes.func.isRequired,
  isCheck: PropTypes.bool.isRequired,
};

export default ToolSelector;
