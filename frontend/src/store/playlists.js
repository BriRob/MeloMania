import { csrfFetch } from "./csrf";
const GET_PLAYLISTS = "playlists/GET_PLAYLISTS";
// const ONE_PLAYLIST = "playlists/ONE_PLAYLIST";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
// const USER_PLAYLISTS = "playlists/USER_PLAYLISTS";
const NEW_RELATION = "playlists/NEW_RELATION";
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

const newRelation = (relation) => ({
  type: NEW_RELATION,
  relation,
});

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

  console.log("payload", payload)
  const response = await csrfFetch(
    `/api/playlists/new-playlist-song-relation`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  // if (response.ok) {
  //   const relation = await response.json();
  //   // dispatch(getPlaylists(playlists));
  //   console.log("newRelation", newRelation);
  //   dispatch(newRelation(relation))
  //   // dispatch(getAllPlaylists());
  //   return newRelation;
  // }
  // const relation = await response.json();

  // if (relation.message) {
  //   console.log(relation.message)
  //   return relation
  //   // return undefined
  // } else {
  //   dispatch(newRelation(relation))
  //   return newRelation
  // }

  const data = await response.json();
  console.log("data", data)
  if (!data.message) {
    let relation = data
    console.log("relation", relation)
    dispatch(getAllPlaylists());
    return relation;
    // return undefined
  } else {
    console.log("relation message", data.message);
    throw new Error(data.message)
    // return data;
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
      console.log("action.playlists", action.playlists);
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

      // if (newFullList[action.playlist.id]) {
      //   console.log("song already in playlist", Object.values(newFullList));
      // }
      //instead of using playlist.id as key, would like to just have new unique added, so that one song can be added multiple times to one playlist
      // console.log(Object.values(newFullList).length)
      // const newKey = Object.values(newFullList).length + 1
      // console.log(newKey)

      newFullList[action.playlist.id] = action.playlist;
      return newFullList;

    // case NEW_RELATION:
    //   const newRelationState = Object.assign({}, state);
    //   // if (newRelationState[relation.])
    //   console.log("newRelationState", newRelationState);
    //   console.log(
    //     "playlist I want to add to",
    //     newRelationState[action.relation.playlistId]
    //   );

    //   // const songsArr = newRelationState[action.relation.playlistId].Songs;
    //   // console.log("songs array in playlist", songsArr);
    //   // console.log(action.relation.songId)
    //   // console.log("is song included in playlist already?", newRelationState[action.relation.playlistId].Songs.find((songArr) => songArr.id === action.relation.songId))
    //   // console.log("is song included in playlist already?", songsArr.find((song) => song.id === action.relation.songId))

    //   // let oldSong;
    //   // if (songsArr.find((song) => song.id === action.relation.songId)) {
    //   //   oldSong = songsArr.find((song) => song.id === action.relation.songId);
    //   //   newRelationState[action.relation.playlistId].Songs.push(oldSong);
    //   // }

    //   console.log(newRelationState);
    //   return newRelationState;
    case REMOVE_PLAYLIST:
      const newRemovePlaylistState = Object.assign({}, state);
      // console.log("state deleting from", newRemovePlaylistState)
      // console.log("playlistId", action.playlistId)
      // console.log("deleting ====>", newRemovePlaylistState[action.playlistId])
      delete newRemovePlaylistState[action.playlistId];
      return newRemovePlaylistState;

    default:
      return state;
  }
};

export default playlistReducer;
