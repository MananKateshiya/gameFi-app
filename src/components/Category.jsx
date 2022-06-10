import {
  GiMachineGunMagazine,
  GiPuzzle,
  GiConsoleController,
  GiThreeFriends,
  GiMountainClimbing,
} from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/games/casual"}>
        <GiConsoleController />
        <h4>Casual</h4>
      </SLink>

      <SLink to={"/games/massively-multiplayer"}>
        <GiThreeFriends />
        <h4>Multi Player</h4>
      </SLink>

      <SLink to={"/games/shooter"}>
        <GiMachineGunMagazine />
        <h4>Shooter</h4>
      </SLink>

      <SLink to={"/games/puzzle"}>
        <GiPuzzle />
        <h4>Puzzle</h4>
      </SLink>

      <SLink to={"/games/adventure"}>
        <GiMountainClimbing />
        <h4>Adventure</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  margin-right: 2rem;
  background: linear-gradient(45deg, #585858, #313131);
  width: 7rem;
  height: 7rem;
  cursor: pointer;
  transform: scale(0.8);

  h4 {
    color: white;
    font-size: 1rem;
  }

  svg {
    color: white;
    font-size: 2.3rem;
  }

  &.active {
    background: linear-gradient(45deg, #ff924e, #e94057, #c919ec);
    background-size: 400% 400%;
    animation: grad 3s ease infinite;

    @keyframes grad {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;

export default Category;
