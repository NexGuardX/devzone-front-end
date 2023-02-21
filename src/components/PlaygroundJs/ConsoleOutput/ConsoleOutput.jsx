/* eslint-disable no-undefined */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
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
  const outputRef = useRef(null);
  const [consoleLog, setConsoleLog] = useState([]);
  const [consoleError, setConsoleError] = useState(null);

  const handleMessage = (e) => {
    if (e.data?.log) {
      setConsoleLog(e.data?.log);
    }
    if (e.data?.error || e.data.error === null) {
      setConsoleError(e.data?.error);
      if (e.data?.error) setConsoleLog([]);
    }
  };

  useEffect(() => {
    // Listenning messages from iframe
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [consoleLog, consoleError]);

  const iFrameContent = `
    <html>
      <body>
        <script type='text/javascript'>
        /*-------------------*/
        /* CATCH SyntaxError */
        /*-------------------*/
        // SEND SYNTAX ERROR TO PARENT
        window.onerror = (error) => {
          window.parent.postMessage({ error },'*')
        }
        </script>

        <script type='text/javascript'>
        /*--------------*/
        /* DECLARATIONS */
        /*--------------*/
          const logs = [];
          const originalConsoleLog = console.log;

          const serialize = (obj, parent) => {
            //if (typeof obj !== 'object') return obj;
            const newObj = {};
            Object.entries(obj).forEach(([key, value]) => {
              newObj[key] = value?.constructor?.name === 'Object' ? serialize(value) : parseType(value).type + " ↳ " + parseData(value)
            })
            return newObj
          }
          
          const parseData = item => {
            if (typeof item === 'function') {
              return item.name;
              //return 'ƒ() ' + item.name;
            }
            if (item instanceof Date) {
              return Date(item);
            }
            if (Array.isArray(item)) {
              return '[' + item + ']'
            }
            
            if (item.constructor.name === 'Object') {
              return serialize(item);
            }

            return item;
          }

          const parseType = item => {
            const info = {
              type: item.constructor.name,
              data: parseData(item),
              date: new Date(),
              uuid: window.crypto.randomUUID()
            }

            return info;
          }

          console.log = (...args) => {
            
            // Must Parse log in iframe
            const parsedLog = args.map(parseType)
            logs.push(parsedLog);   
            
            // Send logs to parent
            window.parent.postMessage({ log: logs },'*')

            // print in Console
            originalConsoleLog(...args);
          };
          /*------*/
          /* MAIN */
          /*------*/
          try {
            // RUN CODE
            ${code}
            // SEND EMPTY ERROR
            window.parent.postMessage({ error: null },'*')
          }
          catch (error){
            // SEND ERROR TO PARENT
            window.parent.postMessage({ error },'*')
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div ref={outputRef} className="console-output">
      <iframe
        title="console"
        className="console-output__run"
        sandbox="allow-scripts"
        srcDoc={iFrameContent}
      />
      <div className="console-output__log">
        {consoleLog.map((message) => (
          <span key={window.crypto.randomUUID()} className="console-output__log--message">
            <span className="console-output__log--date">
              {new Date().toLocaleTimeString(undefined, {
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

export default ConsoleOutput;
