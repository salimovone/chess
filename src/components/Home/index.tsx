import Board from "../Board";

type Props = {
    name?: string
}

const Home = (props: Props) => {
    console.log(props);
  return (
    <div className="w-screen h-screen bg-[#2312a9] flex justify-center items-center">
      <Board />
    </div>
  )
}

export default Home