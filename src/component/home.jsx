import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slideshow from "./Slideshow";
import Header from "./Header";
import MultiRoleLogin from "./MultiRoleLogin";

const Home = () => {
  const [leftDirection] = useState("left");
  const [showLogin, setShowLogin] = useState(false);
  const { category } = useParams();

  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response1 = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/category/Regular`
        );
        setCards1(response1.data);

        const response2 = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/category/Bootcamp`
        );
        setCards2(response2.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <div id="home" className="container mx-auto p-4">
      <Header onLoginClick={handleLoginClick} />
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4 mt-[100px]">
          Events
        </h2>
        <Slideshow
          cards={cards1}
          direction={leftDirection}
          showLogin={showLogin}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Bootcamp</h2>
        <Slideshow
          cards={cards2}
          direction={leftDirection}
          showLogin={showLogin}
        />
      </div>

      {showLogin && <MultiRoleLogin onClose={handleCloseLogin} />}
    </div>
  );
};

export default Home;
