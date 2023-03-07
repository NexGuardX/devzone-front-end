/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export const api = axios.create({
  // Configuration
  baseURL: `${REACT_APP_API_URL}`,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});
