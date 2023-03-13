import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

const baseStyle = definePartsStyle({
  container: {
    _hover: {
      borderBottom: '1px solid #D72ED2',
      borderBottomRadius: 'md',
      _dark: {
        borderBottom: '1px solid #56BAC4',
        borderBottomRadius: 'md',
      },
    },
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });
