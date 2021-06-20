import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  width: 100%;
  background-color: rgba(225, 225, 225, 0.3);
  padding: 15px 8px;
  border-radius: 4px;
  color: black;
  margin-bottom: ${props => props.lastOne ? "20px" : "10px"};
`