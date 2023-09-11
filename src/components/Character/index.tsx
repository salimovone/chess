import { handleSelect } from "../../redux/board/boardSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import type { characterCode, teamColor } from "../../types";

type Props = {
  code: characterCode;
  cordinate: {
    y: number;
    x: number;
  };
};

const Character = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentCordinate = useAppSelector((state) => state.board.selected);

  const thisSelected: boolean =
    currentCordinate.isSelected &&
    currentCordinate.x === props.cordinate.x &&
    currentCordinate.y === props.cordinate.y;

  let color: teamColor;
  if (props.code === 1) {
    color = "dark";
  }
  if (props.code === 2) {
    color = "light";
  }

  const handleClick = (): void => {
    dispatch(handleSelect({ ...props.cordinate, team: color }));
  };

  
  return (
    <div
      onClick={handleClick}
      className={
        props.code === 3
          ? "hidden"
          : `flex justify-center items-center border rounded-full w-full h-full p-3 ${
              thisSelected ? "border-red-700 border-4" : ""
            }` + `${props.code === 2 ? " bg-white " : " bg-black "}`
      }
    >
      <div className="flex justify-center items-center border-2 border-gray-600 rounded-full w-full h-full">
        <div className="w-5 h-5 rounded-full bg-gray-600"></div>
      </div>
    </div>
  );
};

export default Character;
