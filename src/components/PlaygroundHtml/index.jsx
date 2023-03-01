import {
  Box,
  Flex,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaExpandAlt } from 'react-icons/fa';
import { SiCsswizardry, SiHtml5, SiJavascript } from 'react-icons/si';
import useLocalStorage from '../../common/hooks/useLocalStorage';
import Editor from '../MonacoEditor';
import { generateIframeHtml } from './generateIframe';

const getHtmlCode = () => `<h1>Hello Devzone</h1>
<button>Click</button>
`;

const getCssCode = () => `body,
p,
h1 {
    margin:0;
    padding:0;
}

button {
    color:blueviolet;
}
`;

const getJsCode = () => `document
    .querySelector('button')
    .addEventListener(
        'click',
        () => { alert('Click')});       
`;

/**
 * React Component that displays PlaygroundHtml
 * - 3 editors : html + css + javascript
 * - Output Result
 * @returns {JSX.elements} React Component
 */
export default function PlaygroundHtml() {
  const [codeHtml, setCodeHtml] = useLocalStorage(getHtmlCode, 'playgroundHtml-html');
  const [codeCss, setCodeCss] = useLocalStorage(getCssCode, 'playgroundHtml-css');
  const [codeJs, setCodeJs] = useLocalStorage(getJsCode, 'playgroundHtml-js');

  const getEditorsSettings = () => ({
    html: {
      title: 'HTML',
      icon: SiHtml5,
      color: 'orange.500',
      language: 'html',
      code: codeHtml,
      setCode: setCodeHtml,
    },

    css: {
      title: 'CSS',
      icon: SiCsswizardry,
      color: 'blue.500',
      language: 'css',
      code: codeCss,
      setCode: setCodeCss,
    },

    js: {
      title: 'Javascript',
      icon: SiJavascript,
      color: 'yellow.300',
      language: 'javascript',
      code: codeJs,
      setCode: setCodeJs,
    },
  });

  const [editorsSettings, setEditorsSettings] = useState(getEditorsSettings);
  const editors = Object.keys(getEditorsSettings());

  const handleResize = (e) => {
    const name = e.currentTarget.getAttribute('name');

    setEditorsSettings((es) => {
      const editor = {
        ...editorsSettings[name],
        hide: !es[name].hide,
      };
      return { ...es, [name]: editor };
    });
  };

  const titleResult = <Text fontWeight="bold">Result</Text>;

  return (
    <>
      {/* ------------------------------------ */}
      {/* MOBILE */}
      {/* ------------------------------------ */}
      <Flex display={{ md: 'none' }} p="2rem" height="100%" flexDirection="column">
        {/* CODE EDITORS : HTML + CSS + JS */}
        <Tabs height="100%">
          <TabList>
            {editors.map((editor) => (
              <Tab key={editor}>
                <HStack>
                  <Icon as={editorsSettings[editor].icon} color={editorsSettings[editor].color} />
                  <Text fontWeight="bold">{editorsSettings[editor].title}</Text>
                </HStack>
              </Tab>
            ))}
          </TabList>

          <TabPanels height="45%">
            {editors.map((editor) => (
              <TabPanel key={editor} height="100%">
                <Editor
                  language={editorsSettings[editor].language}
                  code={editorsSettings[editor].code}
                  setCode={editorsSettings[editor].setCode}
                />
              </TabPanel>
            ))}
          </TabPanels>

          {/* RESULT */}
          <Box width="100%" height="45%">
            {titleResult}
            <Box border="1px solid lightgray" height="100%">
              {generateIframeHtml(codeHtml, codeCss, codeJs)}
            </Box>
          </Box>
        </Tabs>
      </Flex>

      {/* ------------------------------------ */}
      {/* TABLET & DESKTOP */}
      {/* ------------------------------------ */}
      <Flex display={{ base: 'none', md: 'flex' }} flexDirection="column" height="100%" p="1rem">
        {/* CODE EDITORS : HTML + CSS + JS */}
        <Flex height="45%" gap="1rem" width="100%">
          {editors.map((editor) => (
            <Box
              key={editor}
              height="90%"
              minWidth={editorsSettings[editor].hide ? '40px' : '32%'}
              flex={editorsSettings[editor].hide ? '0' : '1'}
            >
              <HStack name={editor} _hover={{ cursor: 'pointer' }} onClick={handleResize}>
                <Icon as={editorsSettings[editor].icon} color={editorsSettings[editor].color} />
                <Text fontWeight="bold" display={editorsSettings[editor].hide ? 'none' : 'initial'}>
                  {editorsSettings[editor].title}
                </Text>
                <Icon as={FaExpandAlt} />
              </HStack>
              <Box display={editorsSettings[editor].hide ? 'none' : 'initial'}>
                <Editor
                  language={editorsSettings[editor].language}
                  code={editorsSettings[editor].code}
                  setCode={editorsSettings[editor].setCode}
                />
              </Box>
            </Box>
          ))}
        </Flex>

        {/* RESULT */}
        <Box width="100%" height="50%">
          {titleResult}
          <Box border="1px solid lightgray" height="100%">
            {generateIframeHtml(codeHtml, codeCss, codeJs)}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
