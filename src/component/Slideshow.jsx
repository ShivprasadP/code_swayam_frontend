import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Slideshow = ({ numCards, direction }) => {
  const slides = [
    { title: 'Card 1', description: 'Description for Card 1' },
    { title: 'Card 2', description: 'Description for Card 2' },
    { title: 'Card 3', description: 'Description for Card 3' },
    { title: 'Card 4', description: 'Description for Card 4' },
    { title: 'Card 5', description: 'Description for Card 5' },
    { title: 'Card 6', description: 'Description for Card 6' },
    { title: 'Card 7', description: 'Description for Card 7' },
    { title: 'Card 8', description: 'Description for Card 8' },
    { title: 'Card 9', description: 'Description for Card 9' },
  ];

  // Limit the number of cards to display
  const displayedSlides = slides.slice(0, numCards);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        if (direction === 'left') {
          // Move the first card to the end when rotating left
          const newSlide = (prevSlide - 1 + displayedSlides.length) % displayedSlides.length;
          return newSlide;
        } else {
          // Move the last card to the beginning when rotating right
          const newSlide = (prevSlide + 1) % displayedSlides.length;
          return newSlide;
        }
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [direction, displayedSlides]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-hidden">
        <div
          className={`flex transition-transform duration-1000 ease-in-out`}
          style={{
            transform: `translateX(-${(currentSlide % displayedSlides.length) * 33.333}%)`, // 3 cards per view
          }}
        >
          {displayedSlides.map((slide, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 px-4 py-6 bg-white rounded-lg shadow-lg mx-2 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-gray-900">{slide.title}</div>
                <p className="text-gray-700">{slide.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <button
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-all duration-300"
          onClick={() =>
            setCurrentSlide((prevSlide) => {
              return (prevSlide - 1 + displayedSlides.length) % displayedSlides.length;
            })
          }
        >
          &#8592;
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <button
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition-all duration-300"
          onClick={() =>
            setCurrentSlide((prevSlide) => {
              return (prevSlide + 1) % displayedSlides.length;
            })
          }
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

// Add PropTypes validation
Slideshow.propTypes = {
  numCards: PropTypes.number.isRequired,  // Ensure numCards is a number and is required
  direction: PropTypes.oneOf(['left', 'right']).isRequired,  // Ensure direction is either 'left' or 'right'
};

export default Slideshow;
