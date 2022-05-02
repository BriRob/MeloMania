import { useParams } from "react-router-dom";

const SongDetailPage = () => {
    const { id } = useParams();
    console.log("hello")
    // console.log(songs)
    // console.log(songs[id])
    // const song = songs[id]
    return (
        <>
        {/* {song && */}
        <div>
            <h2>HELLO?!?!</h2>
        </div>
        {/* } */}
        </>
    )
}

export default SongDetailPage;
