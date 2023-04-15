import Welcome from "../pages/Welcome.jsx";
import Connect from "../pages/Connect.jsx";
import {useNavigate} from "react-router-dom";
import Register from "../pages/Register.jsx";
import ChangeName from "../pages/ChangeName.jsx";
import Room from "../pages/Room.jsx";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className={"flex flex-col"}>
            <span className={"text-4xl font-bold text-center text-blue-400"}>404</span>
            <span className={"text-center mt-1"}>There is no such URL :(</span>
            <button
                className={"text-blue-400 hover:scale-125"}
                onClick={e => navigate("/")}
            >go home</button>
        </div>
    )
}


export const routes = [
    {path: "/room", element: Connect, private: true},
    {path: "/room/:socket", element: Room, private: true},
    {path: "/register", element: Register},
    {path: "/changeName", element: ChangeName, private: true},
    {path: "/", element:Welcome},
    {path: "/*", element: NotFound}
]