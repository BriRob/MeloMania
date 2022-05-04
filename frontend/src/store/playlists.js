import { csrfFetch } from "./csrf";
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
const ONE_PLAYLIST = "songs/ONE_PLAYLIST";

const getPlaylists = (playlists) => ({
  type: GET_PLAYLISTS,
  playlists,
});

const onePlaylist = (playlist) => ({
  type: ONE_PLAYLIST,
  playlist,
});

export const getAllPlaylists = () => async (dispatch) => {
  const response = await fetch("/api/playlists/");

  if (response.ok) {
    const playlists = await response.json();
    dispatch(getPlaylists(playlists));
    return playlists;
  }
};

export const getOnePlaylist = (id) => async (dispatch) => {
    const response = await fetch(`/api/playlists/${id}`);
    // console.log("RESPONSE", response)
    if (response.ok) {
      const playlist = await response.json();
      console.log(playlist.Songs[0].User.username)
      dispatch(onePlaylist(playlist));
      return playlist;
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
    case ONE_PLAYLIST:
        const onePlaylistState = {...state, [action.playlist.id]: action.playlist};
        return onePlaylistState;
    default:
      return state;
  }
};

export default playlistReducer;
