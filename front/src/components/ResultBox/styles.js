import styled from 'styled-components';

export const Container = styled.div`
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
`;

export const TestTitle = styled.label`
  font-size: 24px;
  font-weight: 400;
`;

export const TestResult = styled.label`
  font-size: 80px;
  font-weight: 400;

  @media screen and (max-width: 480px) {
    font-size: 60px;
  }
`;

export const InfoText = styled.label`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 400;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;
export const Button = styled.button`
  font-size: 20px;
  padding: 12px 30px;
  background: ${(props) => props.background};
  font-weight: bold;
  cursor: pointer;
  color: rgb(51, 51, 51) !important;
  border: none;
  border-radius: 10px;

  @media screen and (max-width: 480px) {
    font-size: 17px;
  }
`;
