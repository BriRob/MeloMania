import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOneUser } from "../../store/users";
import ReactAudioPlayer from "react-audio-player";
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';


function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profUser = useSelector((state) => state.userState.oneUser);
  console.log("profile user \n\n", profUser);
  // console.log(userId)
  console.log("songs for this user \n\n", profUser?.songs);

  useEffect(() => {
    // if (!profUser) {
    dispatch(getOneUser(userId));
    // }
  }, [dispatch]);

  if (!profUser) {
    return <>Loading</>;
  } else {
    return (
      <>
        {profUser.user.username}'s Songs
        {profUser.songs.length === 0 && <div>No Songs Yet!</div>}
        {profUser.songs.length >= 1 && (
          <div>
            {profUser.songs.map((song, idx) => (
              <div key={idx}>
                <Link to={`/songs/${song.id}`}>{song.title}</Link>
                <AudioPlayer src={song.url} controls />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default Profile;
