import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllUserPlaylists, getOneUser } from "../../store/users";
import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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

  if (!profUser) {
    return <>Loading...</>;
  } else {
    return (
      <div>
        {/* {profUser && ( */}
            <h1>{profUser.user.username}'s Profile</h1>
          <div>
            <h2>Songs</h2>
            {profUser.songs.length === 0 && <div>No Songs Yet!</div>}
            {profUser.songs.length >= 1 && (
              <div>
                {profUser.songs.map((song, idx) => (
                  <div key={idx} className="eachSongDiv">
                    <Link to={`/songs/${song.id}`}>{song.title}</Link>
                    <AudioPlayer src={song.url} controls />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h2>Playlists</h2>
            {userPls.map((pl, idx) => (
                <div key={idx}>
                    <Link to={`/playlists/${pl.id}`}>{pl.title}</Link>
                </div>
            ))}
          </div>
        {/* )} */}
      </div>
    );
  }
}

export default Profile;
