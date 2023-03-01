import { Box, Flex } from '@chakra-ui/react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Contact from '../components/Contact/index';
import Home from '../components/Home';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import News from '../components/News';
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/contact" element={<Contact />} />

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
          <Route index element={<News />} />
          <Route path="news" element={<News />} />
          <Route path="search" element={<Search />} />
          <Route path="playground-js" element={<PlaygroundJs />} />
          <Route path="playground-html" element={<div>Playground HTML</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
