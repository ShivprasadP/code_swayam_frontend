import { useState, useEffect } from "react";
import axios from "axios";
import Slideshow from "./Slideshow";
import MultiRoleLogin from "./MultiRoleLogin";
import UnlockCareer from "./Home_Body";

const Home = () => {
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/events/category/Regular`),
          axios.get(
            `${import.meta.env.VITE_API_URL}/events/category/Internship`
          ),
          axios.get(`${import.meta.env.VITE_API_URL}/events/category/Bootcamp`),
        ]);

        setCards1([...response1.data, ...response2.data]);
        setCards2(response3.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <UnlockCareer />

      <div id="home" className="container mx-auto p-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-orange-600 mb-6 mt-16 drop-shadow-lg mb-8">
            Exciting Events and Internships
          </h2>
          <Slideshow cards={cards1} />
        </div>

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-purple-600 mb-6 drop-shadow-lg mb-8">
            Bootcamp Programs
          </h2>
          <Slideshow cards={cards2} />
        </div>
      </div>
    </>
  );
};

export default Home;
