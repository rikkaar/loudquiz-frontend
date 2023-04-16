import socket from "../socket.js"
import {useEffect} from "react";

const useSocket = () => {
    useEffect(() => {
        socket.connect()
        socket.on("connect_error", () => {
            console.log("Connection troubles Oops")
            socket.disconnect()
        })
        socket.on("connect", () => {
            console.log(socket.id);
        });
        socket.on("user:conn", () => {
            console.log(socket.id);
        });
        socket.on("room:join", () => {
            console.log(socket)
        })
        socket.on("disconnect", () => {
            console.log(socket.rooms)
        })
        return () => {
            socket.off("connect_error")
        }
    }, [])
}

export default useSocket