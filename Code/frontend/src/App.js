import './App.css';
import './Pages/GeneralUser.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginPage from './Pages/UserLoginPage';
import UserRegisterPage from './Pages/UserRegisterPage';
import UserHomePage from './Pages/UserHomePage';
import UserProfilePage from './Pages/UserProfilePage';
import UserSettingsPage from './Pages/UserSettingsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserHomePage />}/>
          <Route path='/login' element={<UserLoginPage />}/>
          <Route path='/register' element={<UserRegisterPage />}/>
          <Route path='/profile/:username' element={<UserProfilePage />}/>
          <Route path='/settings/:tab' element={<UserSettingsPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
