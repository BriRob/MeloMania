import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSong } from "../../store/songs";
import ReactAudioPlayer from "react-audio-player";

const SongDetailPage = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const song = useSelector((state) => state.songState.songs[id])
    console.log("song", song)

    useEffect(() => {
        dispatch(getOneSong(id))
    }, [dispatch, id])
    return (
        <>
        {song &&
        <div>
            <h2 className="">{song.title}</h2>
            <ReactAudioPlayer src={song.url} controls />
            <div>User: {song.User.username}</div>
            <div> Added {song.createdAt}</div>
            <div>Description: {song.description}</div>
        </div>
        }
        </>
    )
}

export default SongDetailPage;
