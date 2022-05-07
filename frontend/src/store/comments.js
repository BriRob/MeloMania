import { csrfFetch } from "./csrf";

const GET_COMMENTS = "comments/GET_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments,
});

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const getAllComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/songs/${id}/comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
    return comments;
  }
};

export const createNewComment = (payload) => async (dispatch) => {
  // console.log("in comment thunk \n\n")
  const response = await csrfFetch("/api/comments/new-comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    // console.log("response is ok!\n\n")
    const newComment = await response.json();
    dispatch(createComment(newComment));
    return newComment;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  // console.log("in delete thunk \n\n")

  const response = await csrfFetch(`/api/comments/${commentId}`, {
    method: "delete",
  });

  if (response.ok) {
    // console.log("response is ok!\n\n")

    const { commentId } = await response.json();
    dispatch(removeComment(commentId));
    // dispatch(getAllPlaylists());
  }
};

const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      const allComments = {};
      action.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      const allCommentsState = { ...state, ...allComments };
      return allCommentsState;

    case CREATE_COMMENT:
      const newFullList = Object.assign({}, state);
      newFullList[action.comment.id] = action.comment;
      // console.log("newFullList \n\n", newFullList)
      return newFullList;
    case REMOVE_COMMENT:
      const newRemoveCommentState = Object.assign({}, state);
      // console.log("state deleting from\n\n", newRemoveCommentState)
      // console.log("commentId\n\n", action.commentId)
      // console.log("deleting ====>\n\n", newRemoveCommentState[action.commentId])
      delete newRemoveCommentState[action.commentId];
      return newRemoveCommentState;
    default:
      return state;
  }
};

export default commentReducer;
