import styled from 'styled-components';

// Ranking.js styles
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 30px;
  background-color: rgb(238, 238, 238);
  color: rgb(51, 51, 51) !important;
  text-decoration: none !important;
`;

export const Title = styled.label`
  font-size: 40px;
`;

export const RowWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// RankingRow.js styles
export const RankCard = styled.div`
  background-color: ${(props) =>
    props.rank === 1
      ? 'rgba(255, 200, 0, 0.5)'
      : props.rank === 2
      ? 'rgba(168, 185, 200, 0.5)'
      : props.rank === 3
      ? 'rgba(193, 150, 107, 0.5)'
      : '#ffffff'};
  padding: 5px 0px;
  display: grid;
  width: 50%;
  grid-template-columns: 1fr 1fr 1fr;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.3) 10px 10px 10px;
  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const RankNumber = styled.label`
  font-size: 25px;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
export const RankUserName = styled.label`
  font-size: 25px;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
export const RankScore = styled.label`
  font-size: 25px;

  @media screen and (max-width: 480px) {
    font-size: 20px;
  }
`;
