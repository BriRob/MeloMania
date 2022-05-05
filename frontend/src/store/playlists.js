import { csrfFetch } from "./csrf";
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
// const ONE_PLAYLIST = "playlists/ONE_PLAYLIST";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
// const USER_PLAYLISTS = "playlists/USER_PLAYLISTS";
// const NEW_RELATION = "playlists/NEW_PLAYLISTS"
const REMOVE_PLAYLIST = "playlist/REMOVE_PLAYLIST";


const getPlaylists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists,
});

// const onePlaylist = (playlist) => ({
//   type: ONE_PLAYLIST,
//   playlist,
// });

const createPlaylist = (playlist) => ({
  type: CREATE_PLAYLIST,
  playlist,
});

// const userPlaylists = (playlists) => ({
//   type: USER_PLAYLISTS,
//   playlists,
// });

const removePlaylist = (playlistId) => ({
  type: REMOVE_PLAYLIST,
  playlistId,
});



export const getAllPlaylists = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylists(playlists));
    return playlists;
  }
};

// export const getOnePlaylist = (id) => async (dispatch) => {
//     const response = await fetch(`/api/playlists/${id}`);
//     // console.log("RESPONSE", response)
//     if (response.ok) {
//       const playlist = await response.json();
//       console.log(playlist.Songs[0].User.username)
//       dispatch(onePlaylist(playlist));
//       return playlist;
//     }
//   };

export const createNewPlaylist = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/playlists/new-playlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newPlaylist = await response.json();
    dispatch(createPlaylist(newPlaylist));
    return newPlaylist;
  }
};

// for playlist select dropdown on songDetailPage
// export const getAllUserPlaylists = (userId) => async (dispatch) => {
//   const response = await fetch(`/api/playlists/user-playlists/${userId}`);

//   if (response.ok) {
//     const playlists = await response.json();
//     console.log(`all user ${userId} playlists`, playlists)
//     dispatch(getPlaylists(playlists));
//     return playlists;
//   }
// };

export const createSongsPlaylistRelation = (payload) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/playlists/new-playlist-song-relation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (response.ok) {
    const newRelation = await response.json();
    // dispatch(getPlaylists(playlists));
    dispatch(getAllPlaylists());
    return newRelation;
  }
};

export const deletePlaylist = (playlistId) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${playlistId}`, {
    method: "delete",
  });
  //   console.log("RESPONSE", response);
  if (response.ok) {
    const { playlistId } = await response.json();
    dispatch(removePlaylist(playlistId));
    // dispatch(getAllPlaylists());
  }
};

const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      const allPlaylists = {};
      action.playlists.forEach((playlist) => {
        allPlaylists[playlist.id] = playlist;
      });
      const allPlaylistsState = { ...state, ...allPlaylists };
      return allPlaylistsState;
    // case ONE_PLAYLIST:
    //     const onePlaylistState = Object.assign({}, state); // deeply copies state with all nested things
    //     onePlaylistState[action.playlist.id] = action.playlist;
    //     console.log("this is the action", action)
    //     console.log("this is onePlaylistState", onePlaylistState)
    //     return onePlaylistState;
    case CREATE_PLAYLIST:
      const newFullList = Object.assign({}, state);
      newFullList[action.playlist.id] = action.playlist;
      return newFullList;
    case REMOVE_PLAYLIST:
        const newRemovePlaylistState = Object.assign({}, state)
        // console.log("state deleting from", newRemovePlaylistState)
        // console.log("playlistId", action.playlistId)
        // console.log("deleting ====>", newRemovePlaylistState[action.playlistId])
        delete newRemovePlaylistState[action.playlistId]
        return newRemovePlaylistState;

    default:
      return state;
  }
};

export default playlistReducer;
