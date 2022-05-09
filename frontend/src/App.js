import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import UploadSong from "./components/Song/UploadSong";
import SongDetailPage from "./components/Song/SongDetailPage";
import Playlists from "./components/Playlist";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className="underNav">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            {/* <Route path="/playlists/new-playlist" exact>
              <CreatePlaylist />
            </Route> */}
            <Route path={["/playlists", "/playlists/:id"]} exact>
              <Playlists />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/songs/:id">
              <SongDetailPage />
            </Route>
            <Route path="/new-song">
              <UploadSong />
            </Route>

          </Switch>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
