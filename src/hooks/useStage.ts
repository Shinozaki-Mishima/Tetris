import { useEffect, useState } from "react";
import Cell from "../components/Cell/Cell";
import { createStage } from "../gameHelpers";

import { Player } from "./usePlayer";

export type Stage_Cell = [string | number, string];
export type stage = Stage_Cell[][];

function useStage(player: Player, reset: () => void) {
  // states
  const [stage, setStage] = useState(createStage);
  const [clearedRows, setClearedRows] = useState(0);

  useEffect(() => {
    // if we don't have a player, return
    if (!player.position) {
      return;
    }

    setClearedRows(0);

    function clearRow(newStage: stage): stage {
      return newStage.reduce((ack, row) => {
        // if no 0 the row is full and should be cleared
        if(row.findIndex(cell => cell[0] === 0) === -1) {
          setClearedRows(prev => prev + 1);
          // create empty row to push tetromino down
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']) as Stage_Cell[]);
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as stage)
    }

    function updateStage(prevStage: stage): stage {
      // clear the stage
      // if cell = clear & !=0, it's the players move and should be cleared
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      ) as Stage_Cell[][];
      // draw the new move on the stage by looping through the player
      player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
              if(value !== 0) {
                  newStage[y+player.position.y][x+player.position.x] = [value, `${player.collision ? "merged" : "clear"}`];     
              }
          })
      });
      // if the player collided, reset the player 
      if(player.collision) {
        reset();
        // check if we have pairs on rows 
        return clearRow(newStage);
      }
      // return the new stage
      return newStage;  
    }
    // set the stage, parse the prev stage into the update func
    setStage(prev => updateStage(prev));
  }, [player.position?.x, player.collision, player.position?.y, player.tetromino]);
  return { stage, setStage, clearedRows }
}

export default useStage;
