import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppToolLayout from '../components/AppToolLayout/index';
import AuthRoute from '../components/AuthRoute';
import Bookmarks from '../components/Bookmarks';
import Contact from '../components/Contact/index';
import GithubCallback from '../components/GithubCallBack/index';
import GithubOrgs from '../components/GithubOrgs/index';
import GithubRepos from '../components/GithubRepos';
import Home from '../components/Home';
import LegalNotice from '../components/LegalNotice';
import LegalNoticeEn from '../components/LegalNotice/LegalNoticeEn';
import RgpdEn from '../components/LegalNotice/RgpdEn';
import RgpdFr from '../components/LegalNotice/RgpdFr';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import News from '../components/News';
import NotFoundPage from '../components/NotFoundPage/index';
import PlaygroundHtml from '../components/PlaygroundHtml/index';
import PlaygroundJs from '../components/PlaygroundJs';
import Profile from '../components/Profile';
import Search from '../components/Search';
import SignUp from '../components/SignUp';
import {
  thunkFetchSidebarCategoriesAndTools,
  thunkFetchTools,
} from '../features/application/applicationSlice';
import { thunkFetchUserBookmarks } from '../features/bookmarks/bookmarksSlice';
import { thunkRestoreLoggedInUser } from '../features/user/userSlice';
import './App.css';

/**
 * Main Appliccation React Component
 * @returns {JSX.elements} React Component
 */
function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const toastMessage = useSelector((state) => state.application.toastMessage);
  const toast = useToast();

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(thunkRestoreLoggedInUser(userId));
    }
  }, []);

  useEffect(() => {
    dispatch(thunkFetchTools());
    dispatch(thunkFetchSidebarCategoriesAndTools());
    dispatch(thunkFetchUserBookmarks());
  }, [userId]);

  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
  }, [toastMessage]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/github" element={<GithubCallback />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />

        <Route path="/app" element={<AppToolLayout />}>
          {/* use Navigate instead of element to go to path and not only dislay element (for setting toolId) */}
          <Route index element={<Navigate to="/app/news" />} />
          <Route path="news" element={<News />} />
          <Route path="search" element={<Search />} />
          <Route path="playground-js" element={<PlaygroundJs />} />
          <Route path="playground-html" element={<PlaygroundHtml />} />
          <Route
            path="bookmarks"
            element={
              <AuthRoute>
                <Bookmarks />
              </AuthRoute>
            }
          />
          <Route
            path="github-repos"
            element={
              <AuthRoute>
                <GithubRepos />
              </AuthRoute>
            }
          />
          <Route
            path="github-orgs"
            element={
              <AuthRoute>
                <GithubOrgs />
              </AuthRoute>
            }
          />
        </Route>
        <Route path="legal-notice" element={<LegalNotice />} />
        <Route path="legal-notice-en" element={<LegalNoticeEn />} />
        <Route path="rgpd-fr" element={<RgpdFr />} />
        <Route path="rgpd-en" element={<RgpdEn />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
