import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

    useEffect(() => {
        if (user) {
            if (admin) {
                let color_1 = "FFFFFF";
                let color_2 = "D5D5D5";
                document.body.style.background = "linear-gradient(to bottom right, #"+ color_1 +", #"+ color_2 +")";
            } else {
                let color_1 = "FFFFFF";
                let color_2 = "DDC3A5";
                document.body.style.background = "linear-gradient(to bottom right, #"+ color_1 +", #"+ color_2 +")";
            }
        }
    }, [admin, user]);

    const banCheck = (component) => new Promise(async() => {
        if (user) {
            if (!admin) {
                const data = await api.userGet(user);
        
                if (data.data[0].status === 0) {
                    return <UserBannedPage />;
                } else {
                    return component;
                }
            } else {
                return component;
            }
        } else {
            <Navigate to='/login'/>
        }
    })
        

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

                    <Route path='/' element={banCheck(<UserLandPage />)}/>
                    <Route path='/bugs/create' element={banCheck(<BugCreatePage />)}/>
                    <Route path='/bug/:id' element={banCheck(<BugViewPage />)} /> 
                    <Route path='/login' element={<UserLoginPage />}/>
                    <Route path='/register' element={<UserRegisterPage />}/>
                    <Route path='/profile/:username/:tab' element={banCheck(<UserProfilePage />)}/>
                    <Route path='/settings/:tab' element={banCheck(<UserSettingsPage />)}/>
                    <Route path='/rooms/create' element={banCheck(<RoomCreatePage />)}/>
                    <Route path='/rooms/:tab/:page' element={banCheck(<UserRoomPage />)}/>
                    <Route path='/rooms/:tab/:roomname/:page' element={banCheck(<UserRoomPage />)}/>
                    <Route path='/room/:id' element={banCheck(<RoomViewPage />)}/>
                    <Route path='/notes/create' element={banCheck(<NoteCreatePage />)}/>
                    <Route path='/notes/:tab/:page' element={banCheck(<UserNotePage />)}/>
                    <Route path='/notes/:tab/:searchVal/:page' element={banCheck(<UserNotePage />)}/>
                    <Route path='/note/:id' element={banCheck(<NoteViewPage />)}/>
                    <Route path='/note/:id/edit' element={banCheck(<NoteEditPage />)}/>
                    <Route path='/notices/:tab' element={banCheck(<UserNoticePage />)}/>
                    <Route path='/questions/create' element={banCheck(<QuestionCreatePage />)}/>
                    <Route path='/questions/:tab/:page' element={banCheck(<UserQuestionPage />)}/>
                    <Route path='/questions/:tab/:searchVal/:page' element={banCheck(<UserQuestionPage />)}/>
                    <Route path='/question/:id' element={banCheck(<QuestionViewPage />)}/>
                    <Route path='/question/:id/edit' element={banCheck(<QuestionEditPage />)}/>
                    <Route path='/report/create/:type/:id' element={banCheck(<ReportCreatePage />)}/>
                    <Route path='/report/:id' element={banCheck(<ReportViewPage />)} /> 
                    <Route path='/404' element={banCheck(<NotFoundPage />)} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
