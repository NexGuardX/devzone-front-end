/* eslint-disable import/prefer-default-export */
export const generateIframeSrcDoc = (html, css, js) => `
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

export const generateIframeHtml = (html, css, js) => (
  <iframe
    height="100%"
    width="100%"
    sandbox="allow-scripts allow-modals"
    title="result"
    srcDoc={generateIframeSrcDoc(html, css, js)}
  />
);
