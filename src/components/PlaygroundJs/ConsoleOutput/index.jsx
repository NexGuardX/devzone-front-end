import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { generateIframeToExecute } from './generateIframeToExecute';
import './style.scss';

/**
 * React Component that executes javascript code in a sandboxed iframe
 * and displays console outputs
 * CODE => IFRAME =>
 * @param {object} props - Component props
 * @param {string} code - Code to execute
 * @returns {JSX.elements} React Component
 */

function ConsoleOutput({ code }) {
  // Array of log messages to store console.log() from executed code
  const [consoleLog, setConsoleLog] = useState([]);
  // Error message from executed code
  const [consoleError, setConsoleError] = useState(null);
  // To handle scroll in output with useEffect
  const outputRef = useRef(null);

  // Handle messages from iframe
  const handleMessage = (e) => {
    if (e.data?.log) {
      setConsoleLog(e.data?.log);
    }
    if (e.data?.error || e.data.error === null) {
      setConsoleError(e.data?.error);
      if (e.data?.error) {
        setConsoleLog([]);
      }
    }
  };

  // Listenning messages from iframe
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Go to the end of output at each change
  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [consoleLog, consoleError]);

  return (
    <div ref={outputRef} className="console-output">
      {/* Sandboxed Iframe that executes code */}
      <iframe
        title="console"
        className="console-output__run"
        sandbox="allow-scripts"
        srcDoc={generateIframeToExecute(code)}
      />
      {/* Displays Code Output : console.log */}
      <div className="console-output__log">
        {consoleLog.map((message) => (
          <span key={window.crypto.randomUUID()} className="console-output__log--message">
            <span className="console-output__log--date">
              {new Date().toLocaleTimeString('eu', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </span>
            <pre>
              {message.map((messageArg) => (
                <span key={window.crypto.randomUUID()} className="message-type">
                  {messageArg.type !== 'Number' && messageArg.type !== 'String' && (
                    <span className="console-output__type">{messageArg.type}&nbsp;</span>
                  )}
                  <span className="message-data">
                    {JSON.stringify(messageArg.data, null, 2).replace(/"/g, '')}&nbsp;
                  </span>
                </span>
              ))}
            </pre>
          </span>
        ))}
      </div>

      {/* Displays Code Output : Error */}
      <div className="console-output__error">
        <span style={{ display: 'block' }}>
          {consoleError && typeof consoleError === 'object'
            ? `${consoleError.constructor.name} : ${consoleError.message}`
            : consoleError}
        </span>
      </div>
    </div>
  );
}

ConsoleOutput.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ConsoleOutput;
