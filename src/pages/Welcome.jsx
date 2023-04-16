import React from 'react';
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div className={"fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center"}>
            <Link to={'/room'} className={"hover:text-xl text-lg duration-200"}>Welcome to our app!</Link>
        </div>
    );
};

export default Welcome;