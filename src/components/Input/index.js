import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

const StyledField = styled(TextField)`
  && {
    font-family: 'Exo 2', sans-serif;    
    font-size: 20px;
    width: 30%;
    margin-top: 5%;  
    @media (max-width: 640px) {
      font-size: 10px;
    } 
  }
`;
export default StyledField;
