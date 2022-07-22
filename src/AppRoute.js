import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import App from "./App";
import Todo from "./todo/Todo.js";
import Todotest from "./todotest/Todo2.js";
import Chartlist from "./chartlist/ChartList.js";
import Weather from "./weather/Weather.js";  
import Bus from './bus/Bus.js';
import Login from './user/Login.js';
import SignUp from './user/SignUp.js';
import News from './news/News.js';
import PasswordConfirm from './user/PasswordConfirm.js';
import PasswordTemporary from './user/PasswordTemporary.js'
import Paperbase from './manager/Paperbase.js';
import AuthRoute from "./AuthRoute";
import UserManage from "./adminmanage/UserManage";
import NoticeManage from "./adminmanage/NoticeManage";
import Cctvcenter from "./cctvcenter/Cctvcenter";

function AppRoute() {
    return(
        <>
            <Router>
                <div>
                    <Routes>
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/signup" element={ <SignUp /> } />
                        <Route path="/password" element={ <PasswordConfirm /> } />
                        <Route path="/passwordtemporary" element={ <PasswordTemporary /> } />
                        <Route path="/" element={ <App /> } />
                        <Route path="/usermanage" element={ <UserManage /> } />
                        <Route path="/noticemanage" element={ <NoticeManage /> } />
                        <Route path="/manager" element={ <Paperbase /> } />
                        <Route path="/login" element={ <Login /> } />
                        <Route path="/cctv" element={ <Cctvcenter /> } />
                        <Route path="/todo" element={ <Todo /> } />
                        <Route path="/todotest" element={ <Todotest /> } />
                        <Route path="/chartlist" element={ <Chartlist /> } />
                        <Route path="/weather" element={ <Weather /> } />
                        <Route path="/bus" element={ <Bus /> } />
                    </Routes>
                </div>
            </Router>
        </>
    )

}

export default AppRoute;