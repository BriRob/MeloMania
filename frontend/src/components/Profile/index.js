import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneUser } from "../../store/users";


function Profile() {
    const {userId} = useParams()
    const dispatch = useDispatch()
    console.log(userId)

    useEffect(() => {
        dispatch(getOneUser(userId))
    }, [dispatch])
    return (
        <>
        HELLO PROFILE
        </>
    )
}

export default Profile;
