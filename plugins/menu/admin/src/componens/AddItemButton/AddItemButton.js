import styled from 'styled-components';
import React from 'react';

const AddButton = styled.button`
  padding: 0;
  margin: ${props => props.sub ? '20px 0 20px 40px' : '20px 0'};
  height: 25px;
  width: 100px;
  background-color: darkgreen;
  border-radius: 5px;
  font-weight: bold;
  color: aliceblue;
    
  &:hover {
    opacity: .6;
    cursor: pointer;
  }
`;

const AddItemButton = ({ onClick, sub }) => {
  return (
    <AddButton onClick={onClick} sub={sub}>Add</AddButton>
  );
}

export default AddItemButton;
