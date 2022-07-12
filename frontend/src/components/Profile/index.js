import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllUserPlaylists, getOneUser } from "../../store/users";
import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './Profile.css'

function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profUser = useSelector((state) => state.userState.oneUser);
  const userPls = useSelector((state) => state.userState.oneUser?.playlists);
  console.log("profile user \n\n", profUser);
  // console.log(userId)
  console.log("songs for this user \n\n", profUser?.songs);

    console.log("user's playlists \n\n", userPls)

  useEffect(() => {
    // if (!profUser) {
        (async () => {
            await dispatch(getOneUser(userId));
            await dispatch(getAllUserPlaylists(userId));
        })()
    // }
  }, [dispatch]);

//   useEffect(() => {
//   }, [dispatch]);

  if (!profUser || !userPls) {
    return <>Loading...</>;
  } else {
    return (
      <div className="profileBig">
        {/* {profUser && ( */}
            <h1>{profUser.user.username}'s Profile</h1>
          <div className="profSongsBigDiv">
            <h2>Songs</h2>
            {profUser.songs.length === 0 && <div className="noSongs">No Songs Yet!</div>}
            {profUser.songs.length >= 1 && (
              <div className="profSongsDiv">
                {profUser?.songs.map((song, idx) => (
                  <div key={idx} className="eachSongDiv">
                    <Link to={`/songs/${song.id}`} className="songLink">{song.title}</Link>
                    <AudioPlayer src={song.url} controls autoPlay={false} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="profPlBigDiv">
            <h2>Playlists</h2>
            {userPls.length === 0 && <div className="noPl">No Playlists Yet!</div>}
            {userPls.length >= 1 && (
                <div className="profPlDiv">
                    {userPls.map((pl, idx) => (
                        <div key={idx} >
                            <Link to={`/playlists/${pl.id}`} className="eachPlDiv">{pl.title}</Link>
                        </div>
                    ))}
                </div>
            )}
          </div>
        {/* )} */}
      </div>
    );
  }
}

export default Profile;
