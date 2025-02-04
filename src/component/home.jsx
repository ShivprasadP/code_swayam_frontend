import { useState } from 'react';
import Slideshow from './SlideShow';

const Home = () => {
  const [numCards1] = useState(5);
  const [direction1] = useState('left'); // Direction for first slideshow

  const [numCards2] = useState(5);
  const [direction2] = useState('right'); // Direction for second slideshow

  return (
    <div id="home" className="container mx-auto p-4">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4 mt-[100px]">Events</h2>
        <Slideshow numCards={numCards1} direction={direction1} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Bootcamp</h2>
        <Slideshow numCards={numCards2} direction={direction2} />
      </div>
    </div>
  );
};

export default Home;
