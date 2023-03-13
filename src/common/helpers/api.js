/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

// Backend API Axios Instance
export const api = axios.create({
  // Configuration
  baseURL: `${REACT_APP_API_URL}`,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Github API Axios Instance
export const apiGithub = axios.create({
  // Configuration
  baseURL: 'https://api.github.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});
