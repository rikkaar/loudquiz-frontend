import React, {useEffect, useRef, useState} from 'react';
import {useQuizStore} from "../../store/store.js";
import {Link, useNavigate, useParams} from 'react-router-dom';
import Loading from "../components/Loading.jsx";
import RoomService from "../service/RoomService.js";
import useSocket from "../hooks/useSocket.jsx";
import returnIcon from "../assets/return.png";
import WannaQuit from "../components/WannaQuit.jsx";
import socket from "../socket.js";
import ComplicityToStr from "../helpers/complicityToStr.js";

const Room = () => {
    const params = useParams()
    const roomSettings = useQuizStore((state) => state.roomSettings)
    const user = useQuizStore((state) => state.user)
    const setRoomSettings = useQuizStore((state) => state.setRoomSettings)
    // const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()
    useEffect(() => { // Мы получили и установили настройки комнаты, они актуальны до момента внесения изменений
        if (user.roomId === null) {
            navigate("/room")
        }
    }, [])
    useSocket()

    socket.emit("room:join", params.socket)
    // Проверка на то, что ты - хост и имеешь право редактирования.
    if (user.id === roomSettings.host) {
        console.log("Ты - хост")
    }

    const changeComplicity = () => {
        // from 0 - 3 orderList[(turn - 1) % orderList.length]
        let newComplicity = (roomSettings.complicity + 1) % 4
        setRoomSettings({...roomSettings, complicity: newComplicity})
        // changeComplicity(roomSettings.id, newComplicity)
    }

    const changeExperimental = () => {
        let state = !roomSettings.experimental
        setRoomSettings({...roomSettings, experimental: state})
        // changeExperimental(roomSettings.id, state)
    }

    const changeLoudQuiz = () => {
        let state = !roomSettings.loud_quiz
        setRoomSettings({...roomSettings, loud_quiz: state})
        // changeLoudQuiz(roomSettings.id, state)
    }

    const [root, setRoot] = useState(true)
    const [game, setGame] = useState("")

    const startGame = () => {
        let index = 3
        setGame(3)
    }

    return (!user.id || !roomSettings.host) ? <Loading/>
        : user.id === roomSettings.host
            ? ( // Если ты - хост
                <div className={"flex flex-col gap-1 text-center p-3 h-full w-full sm:max-w-[400px] justify-end"}>
                    <Link to={'/room'} className={'absolute top-12 right-12'}>
                        <img src={returnIcon} alt="" className={'w-6 h-6'}/>
                    </Link>

                    <div
                        className={"flex justify-between items-center bg-slate-500 p-2 rounded-lg text-white cursor-pointer"}
                        onClick={e => setRoot(!root)}>
                        <span>Ведущий меняется</span>
                        <div className={"cursor-pointer bg-slate-500 rounded-lg"}>
                            {root ? "Да" : "Нет"}
                        </div>
                    </div>

                    <div
                        className={"flex justify-between items-center bg-slate-500 p-2 rounded-lg text-white cursor-pointer"}
                        onClick={changeLoudQuiz}>
                        <span>Вопросы из шоу</span>
                        <div className={"cursor-pointer bg-slate-500 rounded-lg"}>
                            {roomSettings.loud_quiz ? "Да" : "Нет"}
                        </div>
                    </div>

                    <div
                        className={"flex justify-between items-center bg-slate-500 p-2 rounded-lg text-white cursor-pointer"}
                        onClick={changeExperimental}>
                        <span>Вопросы с подвохой</span>
                        <div className={"cursor-pointer bg-slate-500 rounded-lg"}>
                            {roomSettings.experimental ? "Да" : "Нет"}
                        </div>
                    </div>
                    <div
                        className={"flex justify-between items-center bg-slate-500 p-2 rounded-lg text-white cursor-pointer"}
                        onClick={changeComplicity}>
                        <span>Сложность вопросов: </span>
                        <div className={"cursor-pointer bg-slate-500 rounded-lg"}>
                            {ComplicityToStr(roomSettings.complicity)}
                        </div>
                    </div>


                    <div className={"flex justify-between gap-3 items-center mt-1"}>
                        <button
                            onClick={startGame}
                            className={"bg-slate-200 text-center p-3 rounded-lg w-full"}
                        >{game === "" ? "Let's go!" : game}
                        </button>
                        <div className={"bg-slate-200 text-center p-3 rounded-lg w-max drop-shadow font-bold"}>
                            {roomSettings.access_code}
                        </div>
                    </div>
                </div>
            )
            : ( // Если ты - игрок
                <div className={"flex flex-col gap-2 text-center"}>
                    <Link to={'/room'} className={'absolute top-12 right-12'}>
                        <img src={returnIcon} alt="" className={'w-6 h-6'}/>
                    </Link>
                    Hello, player!
                </div>
            )
};

export default Room;