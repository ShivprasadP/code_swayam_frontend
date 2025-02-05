import { useState, useEffect, useRef } from "react";

const Slideshow = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideshowRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

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

  if (cards.length === 0) {
    return <div>No cards available</div>;
  }

  return (
    <div className="relative w-full overflow-hidden bg-orange-100 rounded-lg p-4">
      <div
        ref={slideshowRef}
        className={`flex transition-transform duration-1000 ease-in-out ${
          isTransitioning ? "" : "transition-none"
        }`}
        style={{
          transform: `translateX(-${(currentIndex + 1) * 50}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          className="w-1/2 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2"
          style={{ minWidth: "50%" }}
        >
          <div className="flex justify-between items-center">
            <div className="text-left">
              <div className="text-2xl font-bold mb-2 text-gray-900">
                {cards[cards.length - 1]?.title}
              </div>
              <p className="text-gray-700">
                <strong>Description:</strong>{" "}
                {cards[cards.length - 1]?.description}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {cards[cards.length - 1]?.date}
              </p>
              <p className="text-gray-700">
                <strong>Time:</strong> {cards[cards.length - 1]?.time}
              </p>
              <p className="text-gray-700">
                <strong>Venue:</strong> {cards[cards.length - 1]?.venue}
              </p>
            </div>
            <div className="w-24 h-24">
              <img
                src={`/images/${
                  cards[cards.length - 1]?.category === "Regular"
                    ? "event"
                    : "bootcamp"
                }${cards.length % 4}.svg`}
                alt="SVG"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        {cards.map((card, index) => {
          const cardIndex = (index % 4) + 1;
          return (
            <div
              key={index}
              className="w-1/2 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2"
              style={{ minWidth: "50%" }}
            >
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <div className="text-2xl font-bold mb-2 text-gray-900">
                    {card.title}
                  </div>
                  <p className="text-gray-700">
                    <strong>Description:</strong> {card.description}
                  </p>
                  <p className="text-gray-700">
                    <strong>Date:</strong> {card.date}
                  </p>
                  <p className="text-gray-700">
                    <strong>Time:</strong> {card.time}
                  </p>
                  <p className="text-gray-700">
                    <strong>Venue:</strong> {card.venue}
                  </p>
                </div>
                <div className="w-24 h-24">
                  <img
                    src={`/images/${
                      card.category === "Regular" ? "event" : "bootcamp"
                    }${cardIndex}.svg`}
                    alt="SVG"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="w-1/2 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2"
          style={{ minWidth: "50%" }}
        >
          <div className="flex justify-between items-center">
            <div className="text-left">
              <div className="text-2xl font-bold mb-2 text-gray-900">
                {cards[0]?.title}
              </div>
              <p className="text-gray-700">
                <strong>Description:</strong> {cards[0]?.description}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {cards[0]?.date}
              </p>
              <p className="text-gray-700">
                <strong>Time:</strong> {cards[0]?.time}
              </p>
              <p className="text-gray-700">
                <strong>Venue:</strong> {cards[0]?.venue}
              </p>
            </div>
            <div className="w-24 h-24">
              <img
                src={`/images/${
                  cards[0]?.category === "Regular" ? "event" : "bootcamp"
                }1.svg`}
                alt="SVG"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
