import { csrfFetch } from "./csrf";

const CREATE_COMMENT = "comments/CREATE_COMMENT";

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

export const createNewComment = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/comments/new-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(createComment(newComment));
    return newComment;
  }
};

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default commentReducer;
