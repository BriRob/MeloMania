import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Modal } from "../../context/Modal";
import CreatePlaylist from "./CreatePlaylist";

function NewPlaylistModal() {
//   const sessionUser = useSelector((state) => state.session.user);

  const [showModal, setShowModal] = useState(false);

//   if (!sessionUser) return <Redirect to="/login" />

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Playlist</button>
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
