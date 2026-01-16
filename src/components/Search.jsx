import styled from "styled-components";
import { useState } from "react";
import { Search as SearchIcon } from '@styled-icons/material/Search'

export default function Search({ loading, setSearchFilm }) {
  const [searchText, setSearchText] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchFilm(searchText);
    }
  };

  return (
    <>
      {!loading && (
        <SeachComponent>
        <SearchInput
          onChange={(el) => setSearchText(el.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Поиск фильмов"
          role="search" aria-label="Поисковое поле"
        />
        <SearchIcon size={24} color={'white'} onClick = {() => {setSearchFilm(searchText)}}/>
        </SeachComponent>
      )}
    </>
  );
}

const SeachComponent = styled.div`
display: block;
position: fixed;
left: 0;
top: 10px;
background-color: #616161;
padding: 10px 20px;
border-radius: 0 30px 30px 0;
z-index: 5;
`;
const SearchInput = styled.input`
padding: 8px;
margin-right: 10px;
`;
