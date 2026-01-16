
import styled from "styled-components";
import defaultPoster from "../assets/poster.jpg";

export default function Card({ film, cardRef, openDetails }) {

  return (
    <FilmCard ref={cardRef} onClick={() => openDetails(film)} as="article" aria-labelledby={`film-${film.id}`}>
      <h3>{film.title}</h3>
      <img
        src={film.posterURL}
        alt="film poster"
        onError={(e) => {
          e.target.src = defaultPoster;
        }}
      />
    </FilmCard>
  );
}

const FilmCard = styled.div`

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  padding: 10px;
  background-color: #616161;
  border-radius: 30px;
  margin: 10px 5px;
  color: white;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
  
`;