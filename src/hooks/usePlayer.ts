import { STAGE_WIDTH } from "../setup";
import { collided, randomTetromino } from "../gameHelpers";
import { useState, useCallback } from "react";
import { stage } from "../components/Stage/Stage";

// create interface to describe player obj
export interface Player {
  position: {
    x: number;
    y: number;
  };
  tetromino: (string | number)[][];
  collision: boolean;
}

function usePlayer() {
  const [player, setPlayer] = useState({} as Player);  // set obj to player type
  // rotate function
  function rotate (grid: Player['tetromino']) {
    // transpose the rows to columns 
    const grd = grid.map((_, i) => grid.map(column => column[i]));
    // reverse rows to get rotation 
    return grd.map(row => row.reverse())
  }

  function playerRotationHandler(stage: stage): void {
    const clone_player = JSON.parse(JSON.stringify(player));  // clone the curr player
    clone_player.tetromino = rotate(clone_player.tetromino);

    // make sure the player can't rotate on other objects (game walls or other tetromino)
    const positionX = clone_player.position.x;
    let offSet = 1;
    while (collided(clone_player, stage, { x: 0, y: 0 })) {
      clone_player.position.x += offSet;
      offSet  = -(offSet + (offSet > 0 ? 1 : -1));
      // check is offset is greater than the clone length
      if(offSet > clone_player.tetromino[0].length) {
        clone_player.position.x = positionX;
        return;
      }
    }

    // set the player to the clone 
    setPlayer(clone_player)
  }

  function updateLayerPosition({
    x,
    y,
    collision,
  }: {
    x: number;
    y: number;
    collision: boolean;
  }): void {
    // set the new player
    setPlayer((prev) => ({
      ...prev,
      position: { x: (prev.position.x += x), y: (prev.position.y += y) },
      collision: collision,
    }));
  }
  // reset the player object
  const resetPlayer = useCallback((): void => {
    setPlayer({
      position: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collision: false,
    });
  }, []);

  return { player, updateLayerPosition, resetPlayer, playerRotationHandler };
}

export default usePlayer;
