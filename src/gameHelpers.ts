import { Player } from "./hooks/usePlayer";
import { stage } from "./hooks/useStage";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./setup";
import { tetromino } from "./setup";

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, "clear"]));

export const randomTetromino = () => {
  const Tetrominos = [
    "I",
    "J",
    "L",
    "O",
    "S",
    "T",
    "Z",
  ] as (keyof typeof tetromino)[];
  const randTetromino =
    Tetrominos[Math.floor(Math.random() * Tetrominos.length)];
  return tetromino[randTetromino];
};

export function collided(
  player: Player,
  stage: stage,
  { x: moveX, y: moveY }: { x: number; y: number }
) {
  // use for loop to return (and break)
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // check to make sure we're on a tetromino cell
      if (player.tetromino[y][x] !== 0) {
        // check if our move is inside the game area hieght and width,
        // and that the teromino is not movingthrough the bottom of the grid.
        // check that the cell the tetromino is moving towards isn't set to clear
        if (
          !stage[y + player.position.y + moveY] ||
          !stage[x + player.position.x + moveX] ||
          stage[y + player.position.y + moveY][
            x + player.position.x + moveX
          ][1] !== "clear"
        ) {
          return true;
        }
      }
    }
  }
  // if false 
  return false;
}
