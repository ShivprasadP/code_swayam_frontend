import { useState } from "react";
import Slideshow from "./Slideshow";

const Home = () => {
  const [numCards] = useState(5);
  const [leftDirection] = useState("left");
  const [rightDirection] = useState("right");

  const cards1 = [
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
    { title: "Card 4", description: "Description for Card 4" },
    { title: "Card 5", description: "Description for Card 5" },
  ];

  const cards2 = [
    { title: "Card 6", description: "Description for Card 6" },
    { title: "Card 7", description: "Description for Card 7" },
    { title: "Card 8", description: "Description for Card 8" },
    { title: "Card 9", description: "Description for Card 9" },
    { title: "Card 10", description: "Description for Card 10" },
  ];

  return (
    <div id="home" className="container mx-auto p-4">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4 mt-[100px]">
          Events
        </h2>
        <Slideshow cards={cards1} direction={leftDirection} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Bootcamp</h2>
        <Slideshow cards={cards2} direction={leftDirection} />
      </div>
    </div>
  );
};

export default Home;
