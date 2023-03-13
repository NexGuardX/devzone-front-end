import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

const baseStyle = definePartsStyle({
  tab: {
    borderBottom: '1px solid #56BAC4',
    py: '2',
    px: '4',
    _dark: {
      borderBottom: '1px solid #D72ED2',
    },
    _selected: {
      border: '1px solid #56BAC4',
      borderBottom: ' none',
      borderTopRadius: 'lg',
      _dark: {
        border: '1px solid #D72ED2',
        borderBottom: ' none',
        borderTopRadius: 'lg',
      },
    },
  },
  tabpanels: {
    borderLeft: '1px solid #56BAC4',
    _dark: {
      borderLeft: '1px solid #D72ED2',
    },
  },
});

export const tabsTheme = defineMultiStyleConfig({ baseStyle });
