import { csrfFetch } from "./csrf";
const ONE_USER = "users/ONE_USER";

const oneUser = (user) => ({
  type: ONE_USER,
  user,
});

export const getOneUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json();
        console.log(user)
        dispatch(oneUser(user))
        return user
    }

}



const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ONE_USER:
            const oneUserState = {...state, oneUser: action.user}
            return oneUserState;
        default:
            return state
    }
}

export default userReducer
