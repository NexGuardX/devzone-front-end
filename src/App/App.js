import { Outlet, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import SideBar from '../components/SideBar';
import SignUp from '../components/SignUp';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>NAVBAR</div>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <SignUp />
            </div>
          }
        />
        <Route
          path="/app"
          element={
            <div>
              <SideBar />
              <Outlet />
            </div>
          }
        >
          <Route index element={<div>WELCOME APP(NEWS)</div>} />
          <Route path="news" element={<div>NEWS</div>} />
          <Route path="search" element={<div>SEARCH</div>} />
          <Route path="playground" element={<div>PLAYGROUND</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
