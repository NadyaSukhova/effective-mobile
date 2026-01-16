import styled from "styled-components";
import defaultPoster from "../assets/poster.jpg";
import { useEffect } from "react";
import { Close } from "@styled-icons/material/Close";
import popcorn from "../assets/popcorn.png";
import camera from "../assets/camera.png";
import armchair from "../assets/armchair.png";

export default function Details({ film, closeDetails }) {
  const description = (
    <>
      <p>
        Инженер-изобретатель Тимофеев сконструировал машину времени, которая
        соединила его квартиру с XVI веком — точнее, с палатами государя Ивана
        Грозного. Туда-то и попадают тёзка царя пенсионер-общественник Иван
        Васильевич Бунша и квартирный вор Жорж Милославский, а сам великий
        государь оказывается в квартире Тимофеева.
      </p>
      <p>
        В сцене допроса милиционерами Иван Васильевич на вопрос о годе рождения
        отвечает: «Тысяча пятьсот тридцать третий от Рождества Христова.», хотя
        Иван Грозный родился 25 августа 1530 года, а летоисчисление «от
        Рождества Христова» было введено Пётром I только в 1700 году. До этого
        на Руси вели летоисчисление «от сотворения мира». Таким образом, ответ
        Ивана Васильевича должен был звучать как «Лето семь тысяч тридцать
        восьмое от сотворения мира».
      </p>
    </>
  );

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      closeDetails();
    }
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeDetails();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [closeDetails]);

  return (
    <FilmWindow onClick={handleClick}>
      <CloseButton onClick={closeDetails}>
        {" "}
        <Close size={40} />{" "}
      </CloseButton>
      <FilmInfo>
        <h2>{film.title}</h2>
        <FilmContent>
          <img
            src={film.posterURL}
            alt="film poster"
            onError={(e) => {
              e.target.src = defaultPoster;
            }}
          />
          <FilmDescription>
            <Field $fullWidth={false}>
              <FieldIcon aria-hidden="true">🎬</FieldIcon>
              <FieldHeader as="h3">ID фильма:</FieldHeader>
              <FieldText $fullWidth={false}>{film.id}</FieldText>
            </Field>
            <Field $fullWidth={false}>
              <FieldIcon aria-hidden="true">🔎</FieldIcon>
              <FieldHeader as="h3">
                ID фильма на сайте IMDb:
              </FieldHeader>
              <FieldText $fullWidth={false}>{film.id}</FieldText>
            </Field>
            <Field $fullWidth={true}>
              <FieldIcon aria-hidden="true">📸</FieldIcon>
              <FieldHeader as="h3">URL постера:</FieldHeader>
              <FieldText  $fullWidth={true} $url={true}><a href = {film.posterURL}>Ссылка на сайте {film.posterURL.split('/M/')[0]}</a></FieldText>
            </Field>
            <Field $fullWidth={true}>
              <FieldIcon aria-hidden="true">📖</FieldIcon>
              <FieldHeader as="h3">Описание:</FieldHeader>
              <FieldText $fullWidth={true}>{description}</FieldText>
            </Field>
          </FilmDescription>
        </FilmContent>
      </FilmInfo>
      <Popcorn src={popcorn} alt=""  aria-hidden="true"/>
      <Camera src={camera} alt=""  aria-hidden="true"/>
      <Armchair src={armchair} alt=""  aria-hidden="true"/>
    </FilmWindow>
  );
}

const FilmWindow = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilmInfo = styled.div`
  padding: 20px 5px 80px;
  width: 90%;
  margin-top: 5vh;
  max-height: 75vh;
  border-radius: 10px;
  height: fit-content;
  background-color: white;
  position: relative;
  overflow-y: auto;
  text-align: left;
  h2 {
  font-size: 24px;
    color: #333;
    margin: 0;
    padding: 10px;
    }

  @media (max-width: 1124px) {
    h2 {
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilmContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  img {
  flex: 0 0 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FilmDescription = styled.ul`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

const Field = styled.article`
  background-color: ${(props) => (props.$fullWidth ? "#3b3b3b" : "#bababa")};
  color: ${(props) => (props.$fullWidth ? "#ffffff" : "#000000")};
  width: ${(props) => (props.$fullWidth ? "calc(100% - 40px)" : "calc(50% - 40px)")};
  margin-bottom: 15px;
  padding: 15px 15px 10px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

    @media (max-width: 768px) {
    width: calc(100% - 20px);
  }
`;

const FieldIcon = styled.span`
  font-size: 32px;
  margin-bottom: 10px;
`;

const FieldHeader = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
   height: 60px;
`;

const FieldText = styled.span`
overflow-wrap: ${(props) => props.$url ? 'break-all' : 'break-word'};
  background-color: ${(props) => (!props.$fullWidth ? "#3b3b3b" : "#bababa")};
  color: ${(props) => (!props.$fullWidth ? "#ffffff" : "#000000")};
  font-size: 24px;
  width: 100%;
  padding: 10px 15px; /* Добавляем внутренние отступы */
  margin-top: 10px;
  margin-bottom: -15px; /* Компенсируем padding родителя */
  border-radius: 0 0 30px 30px; /* Скругляем нижние углы */
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  background-color: white;
  border-radius: 100%;
  padding: 10px;
  &:hover {
    color: #ff4757;
    background-color: rgb(201 201 201);
  }
`;

const DecorImg = styled.img`
  position: absolute;
`;

const Popcorn = styled(DecorImg)`
  z-index: 5;
  width: 60px;
  bottom: 25%;
  right: 10px;
  animation: floatPopcorn 6s ease-in-out infinite;
  @keyframes floatPopcorn {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(-15deg);
    }
  }
`;

const Camera = styled(DecorImg)`
  z-index: 5;
  width: 60px;
  top: 10%;
  left: 8px;
  animation: floatCamera 7s ease-in-out infinite 1s;
  @keyframes floatCamera {
    0%,
    100% {
      transform: translateY(0) rotate(-5deg);
    }
    50% {
      transform: translateY(-10px) rotate(10deg);
    }
  }
`;

const Armchair = styled(DecorImg)`
  z-index: 5;
  width: 130px;
  bottom: 10px;
  right: 5px;
  animation: floatChair 8s ease-in-out infinite 0.5s;
  @keyframes floatChair {
    0%,
    100% {
      transform: translateY(0) rotate(-5deg);
    }
    50% {
      transform: translateY(20px) rotate(8deg);
    }
  }
`;
