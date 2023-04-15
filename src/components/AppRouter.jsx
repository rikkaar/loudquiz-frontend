import React, {useContext, useEffect} from 'react';
import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {routes} from "../router/index.jsx";
import {useQuizStore} from "../../store/store.js";
import Register from "../pages/Register.jsx";
import AuthService from "../service/AuthService.js";


const PrivateOutlet = ({Component}) => {
    const auth = useQuizStore((state) => state.user)
    return auth.id ? <Component/> : <Navigate to="/register"/>;
}

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route => {
                if (route.private) {
                    return (<Route
                        key={route.path}
                        path={route.path}
                        element={<PrivateOutlet Component={route.element}/>}
                    />)
                }
                return (<Route
                    key={route.path}
                    path={route.path}
                    element={<route.element/>}
                />)
            })}
        </Routes>
    );
};

export default AppRouter;
