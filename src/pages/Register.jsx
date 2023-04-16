import React, {useEffect, useRef} from 'react';
import {useQuizStore} from "../../store/store.js";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import AuthService from "../service/AuthService.js";
import toast from "react-hot-toast";
import returnIcon from "../assets/return.png";


const Register = () => {
    const name = useRef(null)
    const create = useRef(null)
    const navigate = useNavigate()
    const setUser = useQuizStore((state) => state.setUser)

    const createHandler = async (name) => {
        if (!name) {
            return toast.error("Поле пустое!")
        }

        try {
            const user = await AuthService.login(name)
            console.log(user)
            localStorage.setItem('token', user.data.token)
            setUser({
                id: user.data.user.id,
                name: user.data.user.name,
                roomId: user.data.user.roomId,
            })
            toast.success('Хорошее имя')
            navigate("/room")
        } catch (e) {
            toast.error('Что-то пошло не так')
        }
    }

    return (
        <div className={"flex flex-col gap-2 text-center"}>
            <Link to={'/room'} className={'absolute top-12 right-12'}>
                <img src={returnIcon} alt="" className={'w-6 h-6'}/>
            </Link>
                <span>Что-то типа регистрации</span>
                <input
                    type="text"
                    placeholder={"Введите ваше имя"}
                    className={"p-3 rounded-lg outline-none bg-slate-100 text-lg text-center"}
                    ref={name}
                />
                <button
                    ref={create}
                    className={"p-2 bg-slate-500 rounded-lg text-white focus:drop-shadow-lg lowercase"}
                    onClick={e => createHandler(name.current.value)}
                >Создать пользователя
                </button>
        </div>
    );
};

export default Register;