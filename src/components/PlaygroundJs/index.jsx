import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../common/hooks/useLocalStorage';
import Editor from '../MonacoEditor';
import ConsoleOutput from './ConsoleOutput';

/**
 * React Component that displays
 * - Editor
 * - Console Output
 * @returns {JSX.elements} React Component
 */

export default function PlaygroundJs() {
  const [code, setCode] = useLocalStorage('// Welcome to DevZone', 'playgroundJs-code');
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
    <Flex flexDirection={{ base: 'column', md: 'row' }} w="100%" h="100%">
      <Box w={{ base: '100%', md: '50%' }} h={{ base: '50%', md: '100%' }}>
        <Editor language="javascript" code={code} setCode={setCode} />
      </Box>

      <Box flexGrow="1" bg="gray">
        <ConsoleOutput code={codeToExecute} />
      </Box>
    </Flex>
  );
}
