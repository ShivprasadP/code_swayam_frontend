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

  return (

    <>
    <UnlockCareer/>
  
    <div id="home" className="container mx-auto p-4">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4 mt-[100px]">
          Events
        </h2>
        <Slideshow cards={cards1} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-4">Bootcamp</h2>
        <Slideshow cards={cards2} />
      </div>
    </div>
    </>
  );

};

export default Home;
