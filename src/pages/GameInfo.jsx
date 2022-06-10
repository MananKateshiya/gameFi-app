import { useState, useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import React from "react";

function GameInfo() {
  const [gameinfo, setGameInfo] = useState([]);
  const [activeTab, setActiveTab] = useState("Description");
  let params = useParams();

  const fetchDetails = async (id) => {
    const check = localStorage.getItem(`info_${id}`);

    if (check) {
      console.log(JSON.parse(check));
      setGameInfo(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_GAMES_API}`
      );

      const detailData = await data.json();

      localStorage.setItem(`info_${id}`, JSON.stringify(detailData));
      console.log(detailData);
      setGameInfo(detailData);
    }
  };
  useEffect(() => {
    fetchDetails([params.name]);
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{gameinfo.name}</h2>
        <img src={gameinfo.background_image} alt={gameinfo.name} />
      </div>

      <Info>
        <Button
          className={activeTab === "Description" ? "active" : ""}
          onClick={() => setActiveTab("Description")}
        >
          Description
        </Button>
        <Button
          className={activeTab === "Developers" ? "active" : ""}
          onClick={() => setActiveTab("Developers")}
        >
          Developer Info
        </Button>
        {activeTab === "Description" && (
          <div>
            <h2 dangerouslySetInnerHTML={{ __html: gameinfo.description }}></h2>
          </div>
        )}
        {activeTab === "Developers" && (
          <div>
            <h2>Hello</h2>
          </div>
        )}
        {/* <ul>{gameinfo.genres.map((e) => <li key={e.id}>{e.name}</li>)}</ul> */}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  img {
    width: 100%;
    border-radius: 2rem;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default GameInfo;
