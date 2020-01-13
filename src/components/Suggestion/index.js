import styled from "styled-components";

const StyledSuggestion = styled.div`
  && {
    font-family: 'Exo 2', sans-serif;    
    font-size: 20px;
    width:95%;
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.4);
  margin: 5px;
  border-radius:7px;
    border: 1px solid black
    &:hover, &:focus {
    cursor: pointer;
    background: yellow;
  }
  }
`;
export default StyledSuggestion;
