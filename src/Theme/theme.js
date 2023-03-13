import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './buttonTheme';
import { cardTheme } from './cardTheme';
import { inputTheme } from './inputTheme';
import { switchTheme } from './switchTheme';
import { tabsTheme } from './tabsTheme';

// eslint-disable-next-line import/prefer-default-export
const theme = extendTheme({
  styles: {
    body: {
      bg: 'f9f9f9',
      _dark: {
        bg: 'gray.800',
      },
    },
  },
  fonts: {
    heading: `'JetBrains Mono', sans-serif`,
    body: `'Dosis', sans-serif`,
  },
  components: {
    Button: buttonTheme,
    Card: cardTheme,
    Switch: switchTheme,
    Input: inputTheme,
    Tabs: tabsTheme,
  },
  config: {
    disableTransitionOnchange: false,
  },
});

export default theme;
