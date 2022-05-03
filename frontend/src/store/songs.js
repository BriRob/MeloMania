import { csrfFetch } from "./csrf";
const GET_SONGS = "songs/GET_SONGS";
const ONE_SONG = "songs/ONE_SONG";
const CREATE_SONG = "songs/CREATE_SONG";
const REMOVE_SONG = "songs/REMOVE_SONG";

const getSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});

const oneSong = (song) => ({
  type: ONE_SONG,
  song,
});

const createSong = (song) => ({
  type: CREATE_SONG,
  song,
});

const removeSong = (songId, userId) => ({
  type: REMOVE_SONG,
  songId,
  userId,
});

export const getAllSongs = () => async (dispatch) => {
  const response = await fetch(`/api/`);
  //   console.log("RESPONSE", response)

  if (response.ok) {
    const songs = await response.json();
    dispatch(getSongs(songs));
    return songs;
  }
};

export const getOneSong = (id) => async (dispatch) => {
  const response = await fetch(`/api/songs/${id}`);
  // console.log("RESPONSE", response)
  if (response.ok) {
    const song = await response.json();
    dispatch(oneSong(song));
    return song;
  }
};

export const createNewSong = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/new-song`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newSong = await response.json();
    dispatch(createSong(newSong));
    return newSong;
  } else {
    return undefined;
  }
};

export const editOneSong = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const editedSong = await response.json();
    dispatch(oneSong(editedSong));
    return editedSong;
  }
};

export const deleteSong = (songId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: "delete",
  });
  console.log("RESPONSE", response)
  if (response.ok) {
    const { id: deletedSongId } = await response.json();
    dispatch(removeSong(deletedSongId, userId));
    return deletedSongId;
  }
};

const initialState = {
  songs: {},
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
      const allSongs = {};
      action.songs.forEach((song) => {
        allSongs[song.id] = song;
      });
      const newState = { ...state, songs: { ...state.songs, ...allSongs } };
      return newState;
    case ONE_SONG:
      const oneSongState = {
        ...state,
        songs: { [action.song.id]: action.song },
      };
      return oneSongState;
    case CREATE_SONG:
      const newSongState = {
        ...state,
        songs: { ...state.songs, [action.song.id]: action.song },
      };
      return newSongState;
    case REMOVE_SONG:
        const deletedSongState = {...state};
        delete deletedSongState[action.songId]
        return deletedSongState
    default:
      return state;
  }
};

export default songReducer;
