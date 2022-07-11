import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Modal } from "../../context/Modal";
import CreatePlaylist from "./CreatePlaylist";
import "./Playlist.css"

function NewPlaylistModal() {
//   const sessionUser = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(false);

//   if (!sessionUser) return <Redirect to="/login" />

  return (
    <>
      <button className="createPlBtn" onClick={() => setShowModal(true)}><i className="fa-solid fa-plus createPlBtnI"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <NewWb setShowModal={setShowModal}/> */}
          <CreatePlaylist hidePlaylist={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default NewPlaylistModal;
