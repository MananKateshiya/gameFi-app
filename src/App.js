import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter, Link } from 'react-router-dom';
import Search from "./components/Search";
import styled from "styled-components";
import { GrGamepad } from 'react-icons/gr';
function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Nav>
          <GrGamepad />
          <Logo to={"/"}>GameFi</Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>

  );
}

const Logo = styled(Link)`

text-decoration: none;
font-size: 1.5rem;
font-weight: 600;
font-family: 'Libster Two', cursive;
margin: 0rem 1rem;
`;

const Nav = styled.div`
padding: 4rem 0rem;
display: flex;
justify-content: flex-start;
align-items: center;
svg{
  font-size: 2rem;
}

`;
export default App;
