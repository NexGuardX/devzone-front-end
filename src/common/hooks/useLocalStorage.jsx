import { useEffect, useState } from 'react';

/**
 * - Initialize state value with :
 *   - localStorage value (if exists)
 *   - or initialState value
 * - Store value in localStorage at each value change
 * @param {any} initialState (serializable value to store in localStorage)
 * @param {string} localStorageKey (key to store in localStorage)
 * @returns {array} [value, setter]
 */
const useLocalStorage = (initialState, localStorageKey) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || initialState
  );

  // Update Local Storage
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
