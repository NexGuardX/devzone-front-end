/* eslint-disable import/prefer-default-export */
import { defineStyleConfig } from '@chakra-ui/react';

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderLeft: '2px solid #D72ED2',
    borderRight: '2px solid #56BAC4',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    _dark: {
      backgroundColor: 'transparent',
    },
    _hover: {
      borderTop: '1px solid #D72ED2',
      borderBottom: '1px solid #56BAC4',
    },
  },
  variants: {
    navButton: {
      border: 'none',
    },
  },
});
