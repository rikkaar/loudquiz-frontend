import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import toast, {Toaster} from 'react-hot-toast';
import {useQuizStore} from "../store/store.js";
import React, {useEffect, useState} from "react";
import AuthService from "./service/AuthService.js";
import Loading from "./components/Loading.jsx";
import RoomService from "./service/RoomService.js";


function App() {
    const setUser = useQuizStore((state) => state.setUser)
    const setRoomSettings = useQuizStore((state) => state.setRoomSettings)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            AuthService.isAuth().then(isAuth => {
                if (isAuth) {
                    setUser({
                        ...isAuth.data
                    })
                }
            if (isAuth.data.roomId){
                RoomService.getRoomById(isAuth.data.roomId)
                    .then(data => {
                        setRoomSettings(data.data)
                    })
            }
            }).catch(e => {
                if (e.response.status === 401) {
                    console.log("пользователь не авторизован")
                    localStorage.removeItem("token")
                }
            }).finally(() => setLoading(false))

        } else {
            console.log("пользователь не авторизован")
            localStorage.removeItem("token")
            setLoading(false)
        }
    }, [])


    return loading ? <Loading/> :(
        <BrowserRouter>
            <div className={"fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center"}>
                <AppRouter/>
                <Toaster
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#000',
                            color: '#fff',
                        }
                    }}
                />
            </div>
        </BrowserRouter>
    )
}

export default App
