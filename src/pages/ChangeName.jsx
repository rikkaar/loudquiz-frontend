import React, {useRef} from 'react';
import {useQuizStore} from "../../store/store.js";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AuthService from "../service/AuthService.js";
import toast from "react-hot-toast";
import returnIcon from "../assets/return.png";

const Register = () => {
    const name = useRef(null)
    const navigate = useNavigate()
    const userStore = useQuizStore((state) => state.user)
    const setUserName = useQuizStore((state) => state.setUserName)

    const createHandler = async (name) => {
        if (!name) {
            return toast.error('Имя не может быть пустым')
        }
        try {
            const user = await AuthService.changeName(name)

            console.log(user)
            localStorage.setItem('token', user.data.token)

            setUserName(name)
            toast.success('Имя успешно изменено')
            navigate("/room")
        } catch (e) {
            console.log(e)
            if (e.response.data.name === "User does not exist") {
                toast.error("Нужно залогиниться!")
                localStorage.removeItem('token')
                return navigate('/register')
            } else toast.error('Что-то пошло не так')
        }

    }

    return (
        <div className={"flex flex-col gap-2 text-center p-3"}>
            <Link to={'/room'} className={'absolute top-12 right-12'}>
                <img src={returnIcon} alt="" className={'w-6 h-6'}/>
            </Link>
            <span className={"break-words max-w-[350px] sm:max-w-full"}>Текущее имя: {userStore.name}</span>
            <input
                type="text"
                placeholder={"Введите новое имя"}
                className={"p-3 rounded-lg outline-none bg-slate-100 text-lg text-center"}
                ref={name}
            />
            <button
                className={"p-2 bg-slate-500 rounded-lg text-white focus:drop-shadow-lg lowercase"}
                onClick={e => createHandler(name.current.value)}
            >Изменить имя
            </button>
        </div>
    );
};

export default Register;