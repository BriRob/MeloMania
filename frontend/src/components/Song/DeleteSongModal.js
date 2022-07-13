import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { deleteSong } from "../../store/songs";

function DeleteSongModal({song}) {

    const dispatch = useDispatch()
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(false);

  //   if (!sessionUser) return <Redirect to="/login" />

  return (
    <>
      <button
        className="delSongBtn"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <NewWb setShowModal={setShowModal}/> */}
          {/* <CreatePlaylist hidePlaylist={() => setShowModal(false)} /> */}
          {/* <div>HeLLO</div> */}
          <div className="youSureDelSong">
            <div className="delQ">Are you sure you want to delete this song?</div>
            <div className="yesNoBtnSong">
              <button
                className="yesDel"
                onClick={() => {
                  dispatch(deleteSong(song.id));
                  return history.push("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)} className="noDel">
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;
