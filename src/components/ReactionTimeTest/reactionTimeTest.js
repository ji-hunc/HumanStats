/**********************************
 * Name : reactionTimeTest.js
 * Author : Jihun Choi
 * Introduction : reactionTime 테스트를 위한 페이지
 ********************************** */
import { useState } from 'react';
import React from 'react';
import ResultBox from '../../components/ResultBox/ResultBox';
import { useRecoilValue } from 'recoil';
import LoginState from '../../States/LoginState';
import Ranking from '../../components/Ranking/Ranking';

export default function ReactionTimeTest() {
  // user 정보 가져오기
  const userInfo = useRecoilValue(LoginState);
  // 배경색 관련
  const [colorState, setColorState] = useState(1);
  const [color, setColor] = useState('rgb(44, 63, 88)');
  // 타이머 ref state, 시간 기록
  const [randomTimer, setRandomTimer] = useState(0);
  const [startTime, setStartTime] = useState(0);
  // 결과 시간 기록
  const [result, setResult] = useState('Click to Start!');
  // 테스트 진행 관련
  const [tryCount, setTrycount] = useState(5);
  const [isTesting, setIsTesting] = useState(false);
  const [isFinishMeasure, setIsFinishMeasure] = useState(null);
  const [totalScoreTime, setTotalScoreTime] = useState(0);
  // 테스트 종료 후 배경 커서 상태 변경
  const [cursor, setCursor] = useState('pointer');
  const [isRegistered, setIsRegistered] = useState(false);

  // 배경색
  const red = 'rgb(234, 83, 83)';
  const green = 'rgb(27, 152, 137)';
  const blue = 'rgb(44, 63, 88)';

  // 기다리는 시간의 최대, 최솟값
  const ranMax = 5000;
  const ranMin = 2000;

  // 게임을 랜덤 시간 후에 초록색으로 바꾸는 함수
  const changeToGreen = () => {
    const randomNum = Math.random() * (ranMax - ranMin) + ranMin;
    const timerId = setTimeout(() => {
      setColor(green);
      setStartTime(Date.now());
      setColorState(3);
    }, randomNum);
    setRandomTimer(timerId);
  };

  // 게임이 종료된 후 초기화 하는 함수
  const initTest = () => {
    setIsTesting(false);
    setTrycount(5);
    setIsFinishMeasure(false);
    setTotalScoreTime(0);
    setCursor('pointer');
    setResult('Click to start!');
    setIsRegistered(false);
  };

  // 게임을 클릭했을 때 처리하는 함수
  const handleClick = () => {
    // 테스트가 끝났으면(5회) 배경 커서 변경 및 클릭 무효화
    if (isFinishMeasure) {
      setCursor('default');
      return;
    }
    // 테스트가 끝났으면(5회) 초기화 진행
    if (!isTesting) {
      initTest();
    }
    if (colorState === 1) {
      // blue 화면일 때
      setIsTesting(true);
      setColor(red); // set to red
      setColorState(2); // set to red
      changeToGreen();
    } else if (colorState === 2) {
      // red 화면일 떄
      clearTimeout(randomTimer);
      setResult('Too Fast!');
      setColor(blue); // set to blue
      setColorState(1); // set to blue
    } else {
      // green 화면일 때
      const score = Date.now() - startTime;
      setResult(score + ' ms');
      setTotalScoreTime((state) => state + score);
      if (tryCount - 1 === 0) {
        setIsTesting(false);
        setTrycount(-1);
        setIsFinishMeasure(true);
        setCursor('default');
      } else {
        setTrycount((state) => state - 1);
      }
      setColor(blue); // set to blue
      setColorState(1); // set to blue
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-center w-full cursor-pointer select-none h-128"
        style={{ backgroundColor: color }}
        onMouseDown={() => handleClick()}
      >
        {colorState === 1 ? (
          // blue 화면일 때
          <div className="text-white">
            {isFinishMeasure ? (
              <ResultBox
                clickTryAgain={initTest}
                testTitle="Reaction Time"
                testResult={totalScoreTime / 5 + ' ms'}
                gameName="ReactionTime"
                score={totalScoreTime / 5}
              />
            ) : (
              <div>
                <label className="flex flex-col items-center justify-center font-medium text-white 4xl:text-8xl 2xl:text-8xl xs:text-4xl">
                  {result}
                </label>
                {isTesting ? (
                  <label className="flex items-center justify-center w-full mt-2 text-4xl font-light text-white 4xl:text-3xl 2xl:text-3xl xs:text-2xl">
                    Click to continue ({5 - tryCount}/5)
                  </label>
                ) : null}
              </div>
            )}
          </div>
        ) : colorState === 2 ? (
          // red 화면일 떄
          <label className="flex flex-col items-center justify-center font-medium text-white 4xl:text-8xl 2xl:text-6xl xs:text-4xl">
            Wait for Green ...
          </label>
        ) : (
          // green 화면일 때
          <label className="flex flex-col items-center justify-center font-medium text-white 4xl:text-8xl 2xl:text-6xl xs:text-4xl">
            Click!
          </label>
        )}
      </div>
      <Ranking gameName={'ReactionTime'} />
    </div>
  );
}
