import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 500px;
  cursor: pointer;
  align-items: center;
  pointer: cursor;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

export const MainText = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 80px;
  color: white;

  @media screen and (max-width: 480px) {
    font-size: 40px;
  }
`;

export const SubText = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 300;
  font-size: 30px;
  color: white;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
