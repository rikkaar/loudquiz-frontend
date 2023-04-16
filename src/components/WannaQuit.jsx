import React, {useState} from 'react';
import Modal from "./Modal/Modal.jsx";
import RoomService from "../service/RoomService.js";
import {useNavigate} from "react-router-dom";
import {useQuizStore} from "../../store/store.js";

const WannaQuit = ({isVisible, setIsVisible}) => {

    const navigate = useNavigate()
    const user = useQuizStore((state) => state.user)

    const deleteRoom = async () => {
        try {
            await RoomService.deleteRoom(user.roomId)
            navigate(`/room`)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
        >
            <div className={"flex flex-col gap-2 text-center"}>
                <span>Удалить комнату?</span>
                <div className={"flex justify-between gap-3"}>
                    <button
                        className={"p-2 bg-red-400 rounded-lg text-white focus:drop-shadow-lg lowercase w-full"}
                        onClick={deleteRoom}
                    >Да
                    </button>
                    <button
                        className={"p-2 bg-slate-400 rounded-lg text-white focus:drop-shadow-lg lowercase w-full"}
                        onClick={() => navigate('/room')}
                    >Нет
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default WannaQuit;