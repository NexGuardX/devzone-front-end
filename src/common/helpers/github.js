import axios from 'axios';

/* eslint-disable import/prefer-default-export */
export const getGithubData = async ({ path, token }) => {
  try {
    const response = await axios.get(
      `https://api.github.com${path}`,
      !token
        ? null
        : {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    );
    return response.data;
  } catch (error) {
    return console.log('⏩ ~ getGithubData ~ error:', error);
  }
};
