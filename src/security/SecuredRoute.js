import React from 'react'
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function SecuredRoute(props) {

    const userInformation = useSelector((state) => state.user.user)

    if (userInformation?.jwt) {
        return (
            <>
                {props.children}
            </>
        );
    }
    if (userInformation?.jwt) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <Navigate to="/"/>
    )

}

export default SecuredRoute
