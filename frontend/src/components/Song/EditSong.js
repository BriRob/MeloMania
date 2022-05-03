import { useState } from "react";
import { useDispatch } from "react-redux";

const EditSong = ({song, hideForm}) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);


    return (
        <div>
            HELLO?!?!?
        </div>
    )
}

export default EditSong;
