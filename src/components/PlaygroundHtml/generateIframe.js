/* eslint-disable import/prefer-default-export */
export const generateIframe = (html, css, js) => `
<html>
  <head>
    <style>
      ${css}
    </style>
    
  </head>
  <body>
    ${html}
    
  </body>
  <script type="text/javascript">
      ${js}
  </script>
</html>
`;
