import { useEffect, useState } from "react";
import { ROWPOINTS } from "../setup";

function useGameState(clearedRows: number) {
    const [score, setScore] = useState(0);
    const [row, setRow] = useState(0);
    const [level, setLevel] = useState(1);

    useEffect(() => {
        if(clearedRows > 0) {
            setScore(prev => prev + ROWPOINTS[clearedRows - 1] * level);
            setRow(prev => prev + clearedRows);
        }
    }, [clearedRows]);

    return { score, setScore, row, setRow, level, setLevel};
}

export default useGameState;