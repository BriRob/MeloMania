import { csrfFetch } from "./csrf";
const ONE_USER = "users/ONE_USER";
const ONE_USER_PLAYLISTS = "users/ONE_USER_PLAYLISTS"

const oneUser = (user) => ({
  type: ONE_USER,
  user,
});

const oneUserPLs = (playlists) => ({
    type: ONE_USER_PLAYLISTS,
    playlists
})

// get all songs for one user
export const getOneUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json();
        // console.log(user)
        dispatch(oneUser(user))
        return user
    }

}

// get all playlists of one user
export const getAllUserPlaylists = (userId) => async (dispatch) => {
  const response = await fetch(`/api/playlists/user-playlists/${userId}`);

  if (response.ok) {
    const playlists = await response.json();
    console.log(`all user ${userId} playlists`, playlists)
    dispatch(oneUserPLs(playlists));
    return playlists;
  }
};



const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ONE_USER:
            const oneUserState = {...state, oneUser: {...state.oneUser, ...action.user}}
            return oneUserState;
        case ONE_USER_PLAYLISTS:
            const oneUserPlayListsState = {...state, oneUser: {...state.oneUser, playlists: action.playlists}}
            // console.log('one users playlists \n\n', oneUserPlayListsState)
            return oneUserPlayListsState
        default:
            return state
    }
}

export default userReducer
