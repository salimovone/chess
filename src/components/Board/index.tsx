import { useAppSelector } from "../../redux/store";
import type { characterCode } from "../../types";
import Square from "../Square";

const Board = (): JSX.Element => {
  const boardMap = useAppSelector((state) => state.board.boardMap);

  return (
    <div className="bg-yellow border">
      {boardMap.map((item: number[], index: number) => (
        <div key={index} className="flex">
          {item.map((itm, idx: number) => (
            <Square
              cordinate={{x:idx, y: index}}
              code={itm as characterCode}
              key={idx}
              dark={itm ? true : false}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
