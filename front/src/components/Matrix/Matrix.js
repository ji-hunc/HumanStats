/**********************************
 * Name : Matrix.js
 * Author : Jihun Choi
 * Introduction : SqeuenceMemory 테스트를 위한 3X3 바둑판 컴포넌트. 각 블럭간의 로직이 많이 포함되어 있음.
 ********************************** */
/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import React from 'react';
import * as style from './styles';
import ResultBox from '../ResultBox/ResultBox';
import { useRecoilValue } from 'recoil';
import LoginState from '../../States/LoginState';
import Api from '../../Api/Api';

export default function Matrix(props) {
  // user 정보 가져오기
  const userInfo = useRecoilValue(LoginState);

  // game 진행 관련 states
  const [level, setLevel] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [question, setQuestion] = useState(props.numbers);
  const [gameOver, setGameOver] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const background = props.background;

  // refs
  const squares = useRef();
  const blockRefs = useRef([]);

  // colors
  const originalBlockColor = 'rgb(242, 242, 242)'; // white
  const pickBlockColor = 'rgb(242,193,80)'; // yellow
  const originalBackgroundColor = 'rgb(44, 63, 88)'; // navy
  const wrongAnswerBackgroundColor = 'rgb(234, 83, 83)';
  const correctAnswerBackgroundColor = 'rgb(27, 152, 137)';

  // ref 넣은 상태로 블럭 컴포넌트 미리 생성
  const row1 = [1, 2, 3].map((index) => (
    <style.Square
      key={index}
      onClick={(event) => handleBlockClick(event, index)}
      ref={(el) => (blockRefs.current[index] = el)}
    />
  ));
  const row2 = [4, 5, 6].map((index) => (
    <style.Square
      key={index}
      onClick={(event) => handleBlockClick(event, index)}
      ref={(el) => (blockRefs.current[index] = el)}
    />
  ));
  const row3 = [7, 8, 9].map((index) => (
    <style.Square
      key={index}
      onClick={(event) => handleBlockClick(event, index)}
      ref={(el) => (blockRefs.current[index] = el)}
    />
  ));

  // 랜덤 숫자 시퀀스 생성
  const generateSequence = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let sequence = '';
    let prevNumber = null;

    for (let i = 0; i < 30; i++) {
      let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      if (randomNumber !== prevNumber) {
        sequence += randomNumber.toString();
        prevNumber = randomNumber;
      } else {
        i--;
      }
    }
    setQuestion(sequence);
  };

  // 각 block을 클릭했을 때 처리하는 함수
  const handleBlockClick = (event, index) => {
    const levelVar = level;
    if (question[clickCount] !== index) {
      background.current.style.backgroundColor = wrongAnswerBackgroundColor;
      setTimeout(() => {
        background.current.style.backgroundColor = originalBackgroundColor;
      }, 500);
      // game over
      setGameOver(true);
      generateSequence();
      // alert('Game Over');
      // TODO GameOver시 처리할 프로세스 작성해야함
      return;
    }
    event.target.style.backgroundColor = pickBlockColor;
    setTimeout(() => {
      event.target.style.backgroundColor = originalBlockColor;
    }, 300);
    if (clickCount === level) {
      // next level
      setLevel((state) => state + 1);
      setClickCount(0);
      background.current.style.backgroundColor = correctAnswerBackgroundColor;
      setTimeout(() => {
        background.current.style.backgroundColor = originalBackgroundColor;
        showQuestion(0, levelVar + 1);
      }, 500);
    } else {
      setClickCount((state) => state + 1);
    }
  };

  // 문제를 보여주는 함수
  const showQuestion = (index, levelVar) => {
    squares.current.style.pointerEvents = 'none';
    if (index >= levelVar + 1) {
      squares.current.style.pointerEvents = 'auto';
      return;
    }
    blockRefs.current[question[index]].style.backgroundColor = pickBlockColor;
    setTimeout(() => {
      blockRefs.current[question[index]].style.backgroundColor =
        originalBlockColor;
      showQuestion(index + 1, levelVar);
    }, 500);
  };

  // 최초 게임 시작하는 함수
  const startGame = (index) => {
    showQuestion(index, 0);
  };

  // 게임이 끝나고, 재시작을 하기 위한 초기화 함수
  const initTest = () => {
    setLevel(0);
    setClickCount(0);
    setGameOver(false);
    setIsTesting(false);
    setIsRegistered(false);
  };

  return (
    <style.Container>
      {gameOver ? (
        <ResultBox
          testTitle="SqeuenceTest"
          testResult={level + ' Level'}
          clickTryAgain={initTest}
          saveScore={() =>
            Api.saveScore(
              'SequenceMemory',
              userInfo.userId,
              level,
              isRegistered,
              setIsRegistered,
            )
          }
        />
      ) : isTesting ? (
        <style.Squares ref={squares}>
          <h1 style={{ color: '#ffffff', margin: '0px' }}>
            LEVEL {level + 1}{' '}
          </h1>

          <style.SquareRow>{row1}</style.SquareRow>
          <style.SquareRow>{row2}</style.SquareRow>
          <style.SquareRow>{row3}</style.SquareRow>
        </style.Squares>
      ) : (
        <style.startLabel
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setIsTesting(true);
            // 그려지기 전에 불러서 style 관련 에러 뜸
            setTimeout(() => startGame(0), 500);
          }}
        >
          Click to Start!
        </style.startLabel>
      )}
    </style.Container>
  );
}
