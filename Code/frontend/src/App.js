import './App.css';
import './Pages/GeneralUser.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLoginPage from './Pages/UserLoginPage';
import UserRegisterPage from './Pages/UserRegisterPage';
import UserLandPage from './Pages/UserLandPage';
import UserProfilePage from './Pages/UserProfilePage';
import UserSettingsPage from './Pages/UserSettingsPage';
import UserRoomPage from './Pages/UserRoomPage';
import UserNotePage from './Pages/UserNotePage';
import UserQuestionPage from './Pages/UserQuestionPage';
import NoteViewPage from './Pages/NoteViewPage';
import NoteCreatePage from './Pages/NoteCreatePage';
import QuestionCreatePage from './Pages/QuestionCreatePage';
import QuestionViewPage from './Pages/QuestionViewPage';
import ReportCreatePage from './Pages/ReportCreatePage';
import BugCreatePage from './Pages/BugCreatePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserLandPage />}/>
          <Route path='/bugs/create' element={<BugCreatePage />}/>
          <Route path='/login' element={<UserLoginPage />}/>
          <Route path='/register' element={<UserRegisterPage />}/>
          <Route path='/profile/:username' element={<UserProfilePage />}/>
          <Route path='/settings/:tab' element={<UserSettingsPage />}/>
          <Route path='/rooms/:tab/:page' element={<UserRoomPage />}/>
          <Route path='/notes/create' element={<NoteCreatePage />}/>
          <Route path='/notes/:tab/:page' element={<UserNotePage />}/>
          <Route path='/note/:id' element={<NoteViewPage />}/>
          <Route path='/questions/create' element={<QuestionCreatePage />}/>
          <Route path='/questions/:tab/:page' element={<UserQuestionPage />}/>
          <Route path='/question/:id' element={<QuestionViewPage />}/>
          <Route path='/report/create/:type/:id' element={<ReportCreatePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
