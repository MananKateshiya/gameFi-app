import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function TopRated() {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    getTopRated();
  }, []);

  const getTopRated = async () => {
    const check = localStorage.getItem("top");

    if (check) {
      setTopRated(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAMES_API}&page_size=15`
      );

      const data = await api.json();
      localStorage.setItem("top", JSON.stringify(data.results));

      setTopRated(data.results);
    }
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.75);
  return (
    <>
      <Wrapper>
        <h2>Top Rated Picks</h2>
        <Splide
          options={{
            perPage: 3,

            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
            type: "slide",
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            rewind: true,
          }}
        >
          {shuffle(
            topRated.map((game) => {
              if (game.rating_top >= 5 && game.metacritic >= 90) {
                return (
                  <SplideSlide key={game.id}>
                    <Card>
                      <Link to={"/gameinfo/" + game.id}>
                        <h2>{game.name}</h2>
                        <img src={game.background_image} alt={game.name} />

                        <Gradient />
                      </Link>
                    </Card>
                  </SplideSlide>
                );
              } else {
                return null;
              }
            })
          )}
        </Splide>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h2 {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default TopRated;
