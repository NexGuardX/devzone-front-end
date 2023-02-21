import { Outlet, Route, Routes } from 'react-router-dom';
import NavBar from '../components/NavBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="/login" element={<div>LOGIN</div>} />
        <Route path="/signup" element={<div>SIGNUP</div>} />
        <Route
          path="/app"
          element={
            <div>
              SIDEBAR
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
