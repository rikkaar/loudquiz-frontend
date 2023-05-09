import React, {useRef} from 'react';
import {useQuizStore} from "../../store/store.js";
import {Link, useNavigate} from "react-router-dom";
import userIcon from '../assets/userIcon.png'
import RoomService from "../service/RoomService.js";
import UserService from "../service/UserService.js";
import toast from "react-hot-toast";

const Connect = () => {
    const code = useRef(null)
    const setRoomSettings = useQuizStore((state) => state.setRoomSettings)
    const roomSettings = useQuizStore((state) => state.roomSettings)
    const user = useQuizStore((state) => state.user)
    const setUser = useQuizStore((state) => state.setUser)

    const navigate = useNavigate()

    const createHandler = async () => {
        try {
            if (user.roomId) {
                await RoomService.deleteRoom(user.roomId)
            }
            const room = await RoomService.createRoom()
            await UserService.putInRoom(room.data.id)

            setUser({...user, roomId: room.data.id})
            setRoomSettings(room.data)
            console.log(`user ${user.id}: ${user.name} created a room`)
            navigate(`/room/${room.data.socket}`)
        } catch (e) {
            toast.error('Непредвиденная ошибка')
            console.log(e.message)
        }
    }


    const joinHandler = async (code) => {
        if (!code) {
            return toast.error("Поле пустое!")
        }

        if (isNaN(code) || code.length > 5){
            return toast.error("Неверный код подключения")
        }

        try {
            const room = await RoomService.getRoomByCode(code)
            if (!room.data) {
                return toast.error("Неверный код подключения")
            }
            if (user.id !== room.data.host && user.roomId) {
                await RoomService.deleteRoom(user.roomId)
            }
            await UserService.putInRoom(room.data.id)
            setUser({...user, roomId: room.data.id})
            setRoomSettings(room.data)
            console.log(`user ${user.id}: ${user.name} connecting to room ${code}`)
            navigate(`/room/${room.data.socket}`)
        } catch (e) {
            toast.error('Непредвиденная ошибка')
            console.log(e)
        }
    }

    return (
            <div className={"flex flex-col gap-2 text-center"}>
                <Link to={'/changeName'} className={'absolute top-10 right-10'}>
                    <img src={userIcon} alt="" className={'w-10 h-10 rounded-full'}/>
                </Link>
                <button
                    className={"p-2 bg-slate-500 rounded-lg text-white focus:drop-shadow-lg lowercase"}
                    onClick={createHandler}
                >Создать комнату
                </button>
                <span className={"text-center"}>или</span>
                <input
                    type="tel"
                    placeholder={"Введите код комнаты"}
                    className={"p-3 rounded-lg outline-none bg-slate-100 text-lg text-center"}
                    ref={code}
                />
                <button
                    className={"p-2 bg-slate-500 rounded-lg text-white focus:drop-shadow-lg lowercase"}
                    onClick={e => joinHandler(code.current.value)}
                >Подключиться
                </button>
                {user.roomId
                ?   <button
                        className={"p-2 bg-slate-500 rounded-lg text-white focus:drop-shadow-lg lowercase"}
                        onClick={e => joinHandler(roomSettings.access_code)}
                    >Вернуться в комнату {roomSettings.access_code}
                    </button>
                : null
                }
            </div>
    );
};

export default Connect;