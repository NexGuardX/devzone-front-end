// eslint-disable-next-line import/prefer-default-export
export const generateIframeToExecute = (code) => `
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
