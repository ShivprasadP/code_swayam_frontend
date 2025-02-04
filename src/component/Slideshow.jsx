import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Slideshow = ({ cards, direction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideshowRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [cards.length, direction]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === cards.length) {
      setCurrentIndex(0);
    } else if (currentIndex === -1) {
      setCurrentIndex(cards.length - 1);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-orange-100 rounded-lg p-4">
      <div
        ref={slideshowRef}
        className={`flex transition-transform duration-1000 ease-in-out ${
          isTransitioning ? "" : "transition-none"
        }`}
        style={{
          transform: `translateX(-${(currentIndex + 1) * 50}%)`,
          flexDirection: direction === "left" ? "row" : "row-reverse",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          className="w-1/2 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2"
          style={{ minWidth: "50%" }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold mb-2 text-gray-900">
              {cards[cards.length - 1].title}
            </div>
            <p className="text-gray-700">
              {cards[cards.length - 1].description}
            </p>
          </div>
        </div>
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-1/2 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2"
            style={{ minWidth: "50%" }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold mb-2 text-gray-900">
                {card.title}
              </div>
              <p className="text-gray-700">{card.description}</p>
            </div>
          </div>
        ))}
        <div
          className="w-1/2 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2"
          style={{ minWidth: "50%" }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold mb-2 text-gray-900">
              {cards[0].title}
            </div>
            <p className="text-gray-700">{cards[0].description}</p>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <button
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-all duration-300"
          onClick={() => {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex - 1);
          }}
        >
          &#8592;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <button
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-all duration-300"
          onClick={handleNext}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

// Add PropTypes validation
Slideshow.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
};

export default Slideshow;
