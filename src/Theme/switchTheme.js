import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  switchAnatomy.keys
);

const baseStyle = definePartsStyle({
  thumb: {
    bg: '#0D1831',
  },
  track: {
    bg: 'gray.100',
    _checked: {
      bg: '#56BAC4',
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
