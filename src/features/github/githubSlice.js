/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { apiGithub } from '../../common/helpers/api';
import { setToastMessage } from '../application/applicationSlice';

const initialState = {
  repos: [],
  orgs: [],
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
    setRepos: (state, action) => {
      state.repos = action.payload;
    },
  },
});

export default githubSlice.reducer;
export const { setOrgs, setRepos } = githubSlice.actions;

/** ********************************************* * */
/** *************** THUNKS ********************** * */
/** ********************************************* * */

export const thunkFetchUserRepos = () => async (dispatch, getState) => {
  const { githubToken: token } = getState().user;
  try {
    const response = await apiGithub.get('/user/repos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setRepos(response.data));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error loading Github Repositories', status: 'error' }));
  }
};

export const thunkFetchUserOrgs = () => async (dispatch, getState) => {
  const { githubToken: token } = getState().user;
  try {
    const response = await apiGithub.get('/user/orgs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setOrgs(response.data));
  } catch (error) {
    dispatch(setToastMessage({ title: 'Error loading Github Organizations', status: 'error' }));
  }
};
