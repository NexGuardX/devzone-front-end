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

function App() {
  // Redux hooks to access store values and dispatch actions
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const toastMessage = useSelector((state) => state.application.toastMessage);
  const toast = useToast();

  useEffect(() => {
    // Check if a user is already logged in by looking for their ID in local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      // If a user is found, restore their session
      dispatch(thunkRestoreLoggedInUser(userId));
    }
  }, []);

  // Fetch tools, categories, and user bookmarks when the component is mounted or when the user ID changes
  useEffect(() => {
    dispatch(thunkFetchTools());
    dispatch(thunkFetchSidebarCategoriesAndTools());
    dispatch(thunkFetchUserBookmarks());
  }, [userId]);

  // Display a toast message when the toastMessage value in the store changes
  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage);
    }
  }, [toastMessage]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Define routes for the different pages of the app */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/github" element={<GithubCallback />} />
        {/* Use the AuthRoute component to only allow authenticated users to access the Profile page */}
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />

        {/* Define routes for the different pages of the app that are nested under the AppToolLayout component */}
        <Route path="/app" element={<AppToolLayout />}>
          {/* Use Navigate instead of element to go to path and not only dislay element (for setting toolId) */}
          {/* The News page is the default page to display under

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
