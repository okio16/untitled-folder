import React from "react";
import "./Tile.css";

interface Props {
  image?: string;
  number: number;
  highlight: boolean;
  names?: string;
  tileColor: string; // Add tileColor prop
}

export default function Tile({ number, names, highlight, image, tileColor }: Props) {
  const className: string = [
    "tile",
    tileColor, // Add tileColor to the class names
    highlight && "tile-highlight",
    names,
    image && "chess-piece-tile",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {image && <div style={{ backgroundImage: `url(${image})` }} className="chess-piece"></div>}
    </div>
  );
}
