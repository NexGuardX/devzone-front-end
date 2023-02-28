import { Box, Flex, Grid } from '@chakra-ui/react';
import useLocalStorage from '../../common/hooks/useLocalStorage';
import Editor from '../MonacoEditor';

export default function PlaygroundHtml() {
  const [codeHtml, setCodeHtml] = useLocalStorage('<!-- HTML -->', 'playgroundHtml-html');
  const [codeCss, setCodeCss] = useLocalStorage('/* CSS */', 'playgroundHtml-css');
  const [codeJs, setCodeJs] = useLocalStorage('// JS', 'playgroundHtml-js');

  return (
    <Flex p="2rem" height="100%" flexDirection="column">
      <Grid width="100%" height="50%" gridTemplateColumns="1fr 1fr 1fr" gap="2rem">
        <Box height="90%" width="100%">
          HTML
          <Editor language="html" code={codeHtml} setCode={setCodeHtml} />
        </Box>
        <Box height="90%" width="100%">
          CSS
          <Editor language="css" code={codeCss} setCode={setCodeCss} />
        </Box>
        <Box height="90%" width="100%">
          JAVASCRIPT
          <Editor language="javascript" code={codeJs} setCode={setCodeJs} />
        </Box>
      </Grid>

      {/* RESULT */}
      <Box border="1px solid lightgray" width="100%" height="50%">
        <iframe
          sandbox="allow-scripts allow-modals"
          title="result"
          srcDoc={`
          <head>
            <style>
              ${codeCss}
            </style>
            
          </head>
          <body>
            ${codeHtml}
            
          </body>
          <script type="text/javascript">
              ${codeJs}
          </script>
        `}
        />
      </Box>
    </Flex>
  );
}
