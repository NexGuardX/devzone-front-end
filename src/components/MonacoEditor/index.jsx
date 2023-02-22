import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';

export default function MonacoEditor({ language, code, setCode }) {
  const handleEditorChange = (codeValue) => {
    setCode(codeValue);
  };
  return (
    <Editor
      theme="vs-dark"
      height="100%"
      width="100%"
      defaultLanguage={language}
      options={{
        fontSize: 14,
      }}
      defaultValue={code}
      onChange={handleEditorChange}
    />
  );
}

MonacoEditor.propTypes = {
  language: PropTypes.string.isRequired,
  code: PropTypes.string,
  setCode: PropTypes.func,
};

MonacoEditor.defaultProps = {
  code: '',
  setCode: () => null,
};
