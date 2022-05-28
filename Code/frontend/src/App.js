import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLoginPage from './Pages/AdminLoginPage';
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
import UserNoticePage from './Pages/UserNoticePage';
import AdminLandPage from './Pages/AdminLandPage';
import Cookies from 'js-cookie';
import AdminNoticePage from './Pages/AdminNoticePage';
import AdminReportPage from './Pages/AdminReportPage';
import AdminBugPage from './Pages/AdminBugPage';
import AdminUserPage from './Pages/AdminUserPage';
import AdminSettingsPage from './Pages/AdminSettingsPage';
import NoticeCreatePage from './Pages/NoticeCreatePage';
import ReportViewPage from './Pages/ReportViewPage';
import AdminReportViewPage from './Pages/AdminReportViewPage';
import AdminBugViewPage from './Pages/AdminBugViewPage';
import BugViewPage from './Pages/BugViewPage';
import AdminNoticeViewPage from './Pages/AdminNoticeViewPage';
import RoomCreatePage from './Pages/RoomCreatePage';
import RoomViewPage from './Pages/RoomViewPage';
import NotFoundPage from './Pages/NotFoundPage';
import NoteEditPage from './Pages/NoteEditPage';
import QuestionEditPage from './Pages/QuestionEditPage';
import api from './Api/api';
import UserBannedPage from './Pages/UserBannedPage';

function App() {
    let admin = Cookies.get('admin')
    let user = Cookies.get('user_id')
    let banned = Cookies.get('banned');
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async() => {
            const data = await api.userGet(user);

            if (data.data[0].status === 0) {
                Cookies.set('banned', true)
            }
        }

        if (user) {
            if (admin) {
                let color_1 = "FFFFFF";
                let color_2 = "D5D5D5";
                document.body.style.background = "linear-gradient(to bottom right, #"+ color_1 +", #"+ color_2 +")";
            } else {
                let color_1 = "FFFFFF";
                let color_2 = "DDC3A5";
                document.body.style.background = "linear-gradient(to bottom right, #"+ color_1 +", #"+ color_2 +")";

                fetchUser();
            }
        }
    }, [admin, user, location]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/admin' element={<AdminLandPage />}/>
                    <Route path='/admin/login' element={<AdminLoginPage />}/>
                    <Route path='/admin/notice/:id' element={<AdminNoticeViewPage />}/>
                    <Route path='/admin/notices/create' element={<NoticeCreatePage />}/>
                    <Route path='/admin/notices/:tab/:page' element={<AdminNoticePage />}/>
                    <Route path='/admin/reports/:tab/:page' element={<AdminReportPage />}/>
                    <Route path='/admin/report/:id' element={<AdminReportViewPage />}/>
                    <Route path='/admin/bugs/:tab/:page' element={<AdminBugPage />}/>
                    <Route path='/admin/bug/:id' element={<AdminBugViewPage />}/>
                    <Route path='/admin/users/:tab/:page' element={<AdminUserPage />}/>
                    <Route path='/admin/users/:tab/:username/:page' element={<AdminUserPage />} />
                    <Route path='/admin/settings/:tab' element={<AdminSettingsPage />}/>

                    <Route path='/' element={banned ? <UserBannedPage /> : <UserLandPage />}/>
                    <Route path='/bugs/create' element={banned ? <UserBannedPage /> : <BugCreatePage />}/>
                    <Route path='/bug/:id' element={banned ? <UserBannedPage /> : <BugViewPage />} /> 
                    <Route path='/login' element={<UserLoginPage />}/>
                    <Route path='/register' element={<UserRegisterPage />}/>
                    <Route path='/profile/:username/:tab' element={banned ? <UserBannedPage /> : <UserProfilePage />}/>
                    <Route path='/settings/:tab' element={banned ? <UserBannedPage /> : <UserSettingsPage />}/>
                    <Route path='/rooms/create' element={banned ? <UserBannedPage /> : <RoomCreatePage />}/>
                    <Route path='/rooms/:tab/:page' element={banned ? <UserBannedPage /> : <UserRoomPage />}/>
                    <Route path='/rooms/:tab/:roomname/:page' element={banned ? <UserBannedPage /> : <UserRoomPage />}/>
                    <Route path='/room/:id' element={banned ? <UserBannedPage /> : <RoomViewPage />}/>
                    <Route path='/notes/create' element={banned ? <UserBannedPage /> : <NoteCreatePage />}/>
                    <Route path='/notes/:tab/:page' element={banned ? <UserBannedPage /> : <UserNotePage />}/>
                    <Route path='/notes/:tab/:searchVal/:page' element={banned ? <UserBannedPage /> : <UserNotePage />}/>
                    <Route path='/note/:id' element={banned ? <UserBannedPage /> : <NoteViewPage />}/>
                    <Route path='/note/:id/edit' element={banned ? <UserBannedPage /> : <NoteEditPage />}/>
                    <Route path='/notices/:tab' element={banned ? <UserBannedPage /> : <UserNoticePage />}/>
                    <Route path='/questions/create' element={banned ? <UserBannedPage /> : <QuestionCreatePage />}/>
                    <Route path='/questions/:tab/:page' element={banned ? <UserBannedPage /> : <UserQuestionPage />}/>
                    <Route path='/questions/:tab/:searchVal/:page' element={banned ? <UserBannedPage /> : <UserQuestionPage />}/>
                    <Route path='/question/:id' element={banned ? <UserBannedPage /> : <QuestionViewPage />}/>
                    <Route path='/question/:id/edit' element={banned ? <UserBannedPage /> : <QuestionEditPage />}/>
                    <Route path='/report/create/:type/:id' element={banned ? <UserBannedPage /> : <ReportCreatePage />}/>
                    <Route path='/report/:id' element={banned ? <UserBannedPage /> : <ReportViewPage />} /> 
                    <Route path='/404' element={banned ? <UserBannedPage /> : <NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
