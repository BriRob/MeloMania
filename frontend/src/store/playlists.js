import { csrfFetch } from "./csrf";
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
// const ONE_PLAYLIST = "songs/ONE_PLAYLIST";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST"

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
    playlist
})

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
}

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
        const newFullList = Object.assign({}, state)
        newFullList[action.playlist.id] = action.playlist;
        return newFullList;
    default:
      return state;
  }
};

export default playlistReducer;
