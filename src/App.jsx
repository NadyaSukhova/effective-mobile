import { useState } from "react";
import styled from "styled-components";
import List from "./components/List";
import Search from "./components/Search";
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [searchFilm, setSearchFilm] = useState("");
    const [selectedFilm, setSelectedFilm] = useState(null);

  function changeTxt(txt) {
    setSearchFilm(txt);
    setSelectedFilm(null);
  }
  return (
    <>
      <Search loading={loading} setSearchFilm={changeTxt} />
      <List loading={loading} setLoading={setLoading} searchFilm={searchFilm} selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm}/>
    </>
  );
}

export default App;
