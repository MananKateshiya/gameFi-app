import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Games() {
  const [games, setGames] = useState([]);

  let params = useParams();

  const getGames = async (name) => {
    const check = localStorage.getItem(`genres${name}`);

    if (check) {
      setGames(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAMES_API}&genres=${name}`
      );
      const data = await api.json();
      localStorage.setItem(`genres${name}`, JSON.stringify(data.results));
      setGames(data.results);
    }
  };

  useEffect(() => {
    getGames(params.type);
  }, [params.type]);

  return (
    <Grid
    animate={{opacity: 1}}
    initial={{opacity:0}}
    exit={{opacity: 0}}
    transition={{duration: 0.5}}
    >
      {games.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/gameinfo/'+ item.id}>
            <img src={item.background_image} alt={item.name} />
            <h4>{item.name}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  cursor: pointer;

  img:hover {
    box-shadow: 1px 3px 5px black;

    transition: 0.3s;
  }

  img {
    width: 100%;
    min-height: 15rem;
    max-height: 15rem;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
  }
`;
export default Games;
