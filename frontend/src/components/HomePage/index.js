import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div>
            <h2 className="title">Welcome!</h2>
            <div className="songsContainer">
                
            </div>
        </div>
    )
}

export default HomePage;
