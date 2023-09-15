import { handleClickSquarePayload } from "../../interfaces";
import { handleClickSquare } from "../../redux/board/boardSlice";
import { useAppDispatch } from "../../redux/store";
import type { characterCode } from "../../types";
import Character from "../Character";

type Props = {
  code: characterCode;
  dark?: boolean;
  cordinate: {
    x: number;
    y: number;
  };
};

const Square = (props: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  let payload:handleClickSquarePayload = props.cordinate
  return (
    <div
      className="square"
      onClick={()=>dispatch(handleClickSquare(payload))}
      style={{
        padding: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `var(${props.dark ? "--dark" : "--light"})`,
      }}
    >
      {props.code ? (
        <Character code={props.code} cordinate={props.cordinate} />
      ) : null}
    </div>
  );
};

export default Square;