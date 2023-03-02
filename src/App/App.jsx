import { Box, Flex } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Bookmarks from '../components/Bookmarks';
import Contact from '../components/Contact/index';
import Home from '../components/Home';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import News from '../components/News';
import PlaygroundHtml from '../components/PlaygroundHtml/index';
import PlaygroundJs from '../components/PlaygroundJs';
import Profile from '../components/Profile';
import Search from '../components/Search';
import SideBar from '../components/SideBar';
import SignUp from '../components/SignUp';
import './App.css';

/**
 * Main Appliccation React Component
 * @returns {JSX.elements} React Component
 */
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/app"
          element={
            <Flex minH="calc(100dvh - 70px)" maxH="calc(100dvh - 70px)">
              <SideBar />
              <Box flexGrow="1" overflowY="auto">
                <Outlet />
              </Box>
            </Flex>
          }
        >
          <Route index element={<Bookmarks />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="news" element={<News />} />
          <Route path="search" element={<Search />} />
          <Route path="playground-js" element={<PlaygroundJs />} />
          <Route path="playground-html" element={<PlaygroundHtml />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
