import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import cat from "../assets/cat.gif";
import Card from "./Card";
import Details from "./Details";

export default function List({ loading, setLoading, searchFilm, selectedFilm, setSelectedFilm }) {
  const [list, setList] = useState([]);
  const [films, setFilms] = useState([]);

  const [filteredFilms, setFilteredFilms] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [page, setPage] = useState(1);
  const cardRef = useRef(null);
  const observer = useRef(null);
  const scrollYRef = useRef(0);

  const closeDetails = useCallback(() => {
    setShowDetails(false);
    setSelectedFilm(null);
    window.scrollTo(0, scrollYRef.current);
  });
  const openDetails = useCallback((film) => {
    setShowDetails(true);
    setSelectedFilm(film);
    scrollYRef.current = window.scrollY;
  });

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );
  }, []);

  useEffect(() => {
    if (observer.current && cardRef.current) {
      observer.current.observe(cardRef.current);
    }

    return () => {
      if (observer.current && cardRef.current) {
        observer.current.unobserve(cardRef.current);
      }
    };
  }, [films]);

  const fetchAllFilms = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.sampleapis.com/movies/comedy");
      let data = await response.json();
      data = data.sort((a, b) => a.title.localeCompare(b.title));
      setList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllFilms();
  }, []);

  useEffect(() => {
    let filtered = list;

    if (searchFilm && searchFilm.trim().length > 0) {
      filtered = list.filter((x) =>
        x.title.toLowerCase().includes(searchFilm.toLowerCase())
      );
    }
    setFilteredFilms(filtered);
    const filmsToShow = filtered.slice(0, page * 10);
    setFilms(filmsToShow);
  }, [page, list, searchFilm]);

  useEffect(() => {
    setPage(1);
  }, [searchFilm]);

  return (
    <>
      {loading && <img src={cat} alt="Loading..." />}
      {!loading && (
        <FilmsComponent>
          <h1>Список фильмов ({filteredFilms.length}):</h1>
          {films.length === 0 && <h4>Не было найдено ни одного фильма</h4>}
          <FilmsList>
            {films.map((item, index) => (
              <Card
                key={item.id}
                film={item}
                openDetails={openDetails}
                cardRef={index === films.length - 1 ? cardRef : null}
                aria-label={`Фильм: ${item.title}`}
              />
            ))}
          </FilmsList>
          {showDetails && selectedFilm && (
            <Details film={selectedFilm} closeDetails={closeDetails} />
          )}
        </FilmsComponent>
      )}
    </>
  );
}

const FilmsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const FilmsComponent = styled.div`
  margin-top: 50px;
  h1 {
    font-size: 32px;
  }
`;