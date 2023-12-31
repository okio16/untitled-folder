import "./Tile.css";

interface Props {
  image?: string;
  number: number;
  highlight: boolean;
  names?: string;
}

export default function Tile({ number, names, highlight,image  }: Props) {
  const className: string = ["tile",
    number % 2 === 0 && "black-tile",
    number % 2 !== 0 && "white-tile",
    highlight && "tile-highlight",
    names ,
    image && "chess-piece-tile"].filter(Boolean).join(' ');


  return (
    <div className={className}>
      {image && <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>}
    </div>
  );
}