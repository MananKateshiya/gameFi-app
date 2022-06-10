import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function Searched() {
  const [searchedGames, setSearch] = useState([]);

  let params = useParams();

  const getSearched = async (name) => {
    const check = localStorage.getItem(`srGames${name}`);

    if (check) {
      setSearch(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.REACT_APP_GAMES_API}&search=${name}&search_precise=true&ordering=-rating`
      );

      const result = await data.json();
      localStorage.setItem(`srGames${name}`, JSON.stringify(result.results));
      setSearch(result.results);
    }
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedGames.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/gameinfo/" + item.id}>
              <img src={item.background_image} alt={item.name} />
              <h4>{item.name}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
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

export default Searched;
