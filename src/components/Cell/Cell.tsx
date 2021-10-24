import React from "react";
import { StyledCell } from "./Cell.styles";
import { tetromino } from "../../setup";

type props = {
  type: keyof typeof tetromino;
};

const Cell: React.FC<props> = ({ type }) => {
  return <StyledCell type={type} color={tetromino[type].color}></StyledCell>;
};

export default React.memo(Cell);
