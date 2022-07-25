import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSongs, getOneSong } from "../../store/songs";
import "./Search.css"

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();

  const songsObj = useSelector((state) => state.songState.songs);
  //   console.log("songs from selector \n\n", songsObj)

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);

  const songs = Object.values(songsObj);
  // console.log("songs array? \n\n", songs)

  const clickAwaySearch = () => {
    setResults([]);
    setSearchInput("");
  };

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  useEffect(() => {
    // console.log("inside useEffect \n\n", searchInput);
    if (!searchInput) return;
    // if (searchInput) {
    document.addEventListener("click", clickAwaySearch);
    return () => document.removeEventListener("click", clickAwaySearch);
    // }
  }, [searchInput]);

  const handleChange = (e) => {
    const searching = e.target.value;
    setSearchInput(e.target.value);
    if (searching === "") {
      setResults([]);
    } else {
      const searchingSongsArr = songs.filter((song) =>
        song.title.toLowerCase().includes(searching.toLowerCase())
      );
      //   console.log("searching songs arr \n\n", searchingSongsArr);
      setResults(searchingSongsArr);
    }
  };

  const toSong = async (res) => {
    await dispatch(getOneSong(res.id));
    history.push(`/songs/${res.id}`);
    setSearchInput("");
    setResults([]);
  };

  return (
    <div>
      <div className="searchInputX">
        <input
          type="text"
          placeholder="search songs"
          value={searchInput}
          onChange={handleChange}
        ></input>
        {searchInput && (
          <span>
            <i className="fa-solid fa-x"></i>
          </span>
        )}
      </div>
      {searchInput && results.length === 0 && (
        <div className="dynRes">
          <div className="noSongsFound">No songs found</div>
        </div>
      )}
      {results.length !== 0 && (
        <div className="dynRes">
          {results.map((res, idx) => (
            <div key={idx} onClick={() => toSong(res)} className="eachDynRes">
              {res.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
