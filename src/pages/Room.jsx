import React, {useEffect, useRef, useState} from 'react';
import {useQuizStore} from "../../store/store.js";
import { useParams } from 'react-router-dom';
import Loading from "../components/Loading.jsx";
import RoomService from "../service/RoomService.js";
import useSocket from "../hooks/useSocket.jsx";

const Room = () => {
    const [loading, setLoading] = useState(true)
    const {socket} = useParams()
    const roomSettings = useQuizStore((state) => state.roomSettings)
    const setRoomSettings = useQuizStore((state) => state.setRoomSettings)
    useSocket()

    useEffect(()=> {
        RoomService.getRoomSettings(socket).then(room => {
            setRoomSettings(room.data)
        }).finally(() => setLoading(false))

    },[])


    return loading ? <Loading/> :(
        <div>
            {Object.entries(roomSettings).map(setting => {
                return(
                    <p key={setting[0]}>{setting[0]}: {setting[1]}</p>
                )
            })
            }
        </div>
    );
};

export default Room;