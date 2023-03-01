import { Box, Hide, Show } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
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
  const [sizes, setSizes] = useState('auto');

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
  };
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
    <>
      <Hide above="md">
        {/* SplitePane to resize the panels  */}
        <SplitPane split="horizontal" sizes={sizes} onChange={setSizes}>
          <Pane minSize="10%" maxSize="90%">
            <Box style={{ ...layoutCSS }}>
              <Editor language="javascript" code={code} setCode={setCode} />
            </Box>
          </Pane>

          <Box style={{ ...layoutCSS }} bg="gray">
            <ConsoleOutput code={codeToExecute} />
          </Box>
        </SplitPane>
      </Hide>
      <Show above="md">
        <SplitPane sizes={sizes} onChange={setSizes}>
          <Pane minSize="10%" maxSize="90%">
            <Box style={{ ...layoutCSS }}>
              <Editor language="javascript" code={code} setCode={setCode} />
            </Box>
          </Pane>

          <Box flexGrow="1" style={{ ...layoutCSS }} bg="gray">
            <ConsoleOutput code={codeToExecute} />
          </Box>
        </SplitPane>
      </Show>
    </>
  );
}
