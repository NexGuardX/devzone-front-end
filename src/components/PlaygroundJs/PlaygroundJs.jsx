import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Editor from '../MonacoEditor/MonacoEditor';
import ConsoleOutput from './ConsoleOutput/ConsoleOutput';

export default function PlaygroundJs() {
  const [code, setCode] = useState('// Hello');
  const [codeToExecute, setCodeToExecute] = useState('');

  // Delay execution of Code to let user finish typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCodeToExecute(code);
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [code]);

  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      w={{ base: '100dvw', md: 'calc(100dvw - 300px)' }}
      h="calc(100dvh - 70px)"
    >
      <Box w={{ base: '100%', md: '50%' }} h={{ base: '50%', md: '100%' }}>
        <Editor language="javascript" code={code} setCode={setCode} />
      </Box>

      <Box flexGrow="1" bg="gray">
        <ConsoleOutput code={codeToExecute} />
      </Box>
    </Flex>
  );
}
