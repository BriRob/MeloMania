const GET_SONGS = "songs/GET_SONGS";

const getSongs = (songs) => ({
  type: GET_SONGS,
  songs,
});

export const getAllSongs = () => async (dispatch) => {
  const response = await fetch(`/api/`);
//   console.log("RESPONSE", response)

  if (response.ok) {
    const songs = await response.json();
    dispatch(getSongs(songs));
    return songs
  }
};

const initialState = {
  songs: {}
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SONGS:
        const allSongs = {}
        action.songs.forEach(song => {
            allSongs[song.id] = song;
        })
        const newState = {...state, songs: {...state.songs, ...allSongs}}
        return newState
    default:
        return state
  }
}

export default songReducer;
