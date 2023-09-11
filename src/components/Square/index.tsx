import type { characterCode } from "../../types";
import Character from "../Character";

type Props = {
  code: characterCode;
  dark?: boolean;
  cordinate: {
    x: number;
    y: number
  }
};

const Square = (props: Props): JSX.Element => {
  return (
    <div
      className={`w-20 h-20 p-1 flex justify-center items-center bg-[var(${
        props.dark ? "--dark" : "--white"
      })]`}
    >
      {props.code?(<Character code={props.code} cordinate={props.cordinate} />):null}
    </div>
  );
};

export default Square;
