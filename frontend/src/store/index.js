import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songReducer from "./songs";
import playlistReducer from "./playlists";
import commentReducer from "./comments";
import userReducer from "./users"

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  songState: songReducer,
  playlistState: playlistReducer,
  commentState: commentReducer,
  userState: userReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
