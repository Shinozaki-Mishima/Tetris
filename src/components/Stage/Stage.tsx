import React from "react";
import Cell from "../Cell/Cell";
import { StyledStage } from "./Stage.styles";
import { tetromino } from "../../setup";

// type alias
export type Stage_Cell = [keyof typeof tetromino, string];
export type stage = Stage_Cell[][];

type props = {
  stage: stage;
};
// functional component
const Stage: React.FC<props> = ({ stage }) => {
  return (
    <StyledStage>
      {stage.map((row) =>
        row.map((cell, i) => <Cell key={i} type={cell[0]}></Cell>)
      )}
    </StyledStage>
  );
};

export default Stage;
