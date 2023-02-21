import { Box, Flex } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import React from 'react';

export default function PlaygroundJs() {
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      w={{ base: '100dvw', md: 'calc(100dvw - 300px)' }}
      h="calc(100dvh - 70px)"
      bg="blue"
    >
      <Box w={{ base: '100%', md: '50%' }} h={{ base: '50%', md: '100%' }} bg="black">
        <Editor
          theme="vs-dark"
          height="100%"
          width="100%"
          defaultLanguage="javascript"
          options={{
            fontSize: 14,
          }}
        />
      </Box>

      <Box flexGrow="1" bg="red">
        OUTPUT
      </Box>
    </Flex>
  );
}
