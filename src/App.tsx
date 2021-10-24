import React, { Fragment, useRef, useState } from 'react';
import { collided, createStage } from './gameHelpers';
// component imports 
import Stage from './components/Stage/Stage';
import Display from './components/Display/Display';
import StartButton from './components/StartButton/StartButton';
// style imports
import { StyledTetrisWrapper, StyledTetris } from './App.styles';
// custom hook imports
import useInterval from './hooks/useInterval';
import usePlayer from './hooks/usePlayer';
import useStage from './hooks/useStage';
import useGameState from './hooks/useGameState';

const App: React.FC = () => {
  // state management 
  const [fallTime, setFallTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const gameArea = useRef<HTMLDivElement>(null);

  // object destructuring on custom hooks
  const { player, updateLayerPosition, resetPlayer, playerRotationHandler } = usePlayer();
  const { stage, setStage, clearedRows } = useStage(player, resetPlayer);
  const { score, setScore, row, setRow, level, setLevel} = useGameState(clearedRows);

  function movePlayerHandler(direction: number) {
    if(!collided(player, stage, {x: direction, y: 0})){
      updateLayerPosition({ x: direction, y:0 , collision: false });
    }
  }

  function KeyUp({ keyCode }: {keyCode: number}): void {
    // make sure it doesn't run in a game over state 
    if(!gameOver) {
      // change fall speed when user releases down arrow
      if(keyCode === 40) {
        setFallTime(1000 / level + 200);
      }
    }
  }

  const startGameHandler = (): void => {
    // need to focus the window with the key events on start
    if(gameArea.current) {
      gameArea.current.focus();
    }
    // reset everything
    setStage(createStage());
    setFallTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRow(0);
    setGameOver(false);
  }

  function moveHandler ({ keyCode, repeat } : { keyCode: number, repeat: boolean }): void {
    // do not activate keys in game over state  
    if(!gameOver) {
      if(keyCode === 37) { // to the left
        movePlayerHandler(-1);
      } else if(keyCode === 39) { // to the right
        movePlayerHandler(1);
      } else if(keyCode === 40) {
        // call once 
        if(repeat) {
          return;
        }
        setFallTime(30);
      } else if(keyCode === 38) {
        playerRotationHandler(stage);  
      }
    }
  }

  function drop(): void {
    // increase level after 10 rows
    if(row > (level * 10)) {
      setLevel(prev => prev+1);
      // increase spead 
      setFallTime(1000 / level + 200); 
    }

    if(!collided(player, stage, {x: 0, y: 1,})) {
      updateLayerPosition({ x: 0, y: 1, collision: false });
    } else {
      // game over 
      if(player.position.y < 1) {
        console.log('Game Over.');
        setGameOver(true);
        setFallTime(null);
      }
      updateLayerPosition({x: 0, y: 0, collision: true});
    }
  }

  useInterval(() => {
    drop();
  }, fallTime);

  return (
    <StyledTetrisWrapper role='button' tabIndex={0} onKeyDown={moveHandler} onKeyUp={KeyUp} ref={gameArea}>
      <StyledTetris>
        <div className="display">
          {gameOver? (
            <Fragment>
              <Display gameOver={gameOver} text="Game Over"></Display>
              <StartButton callback={startGameHandler}></StartButton>
            </Fragment>
          ): (
            <Fragment>
              <Display text={`Score: ${score}`}></Display>
              <Display text={`Row: ${row}`}></Display>
              <Display text={`Level: ${level}`}></Display>
            </Fragment>
          )}
        </div>
        <Stage stage={stage}></Stage>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default App;
