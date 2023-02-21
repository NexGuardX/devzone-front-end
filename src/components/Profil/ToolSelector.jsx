import { Stack, Switch, Text } from '@chakra-ui/react';

function ToolSelector() {
  return (
    <Stack>
      <Text>{tool.name}</Text>
      <Switch />
    </Stack>
  );
}

export default ToolSelector;
