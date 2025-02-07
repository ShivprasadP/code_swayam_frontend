import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || user.role !== "Student") {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a student to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_API_URL}/solutions/`
        );
        const points = response.data;

        const rankingPromises = Object.keys(points).map(async (studentId) => {
          const userResponse = await Axios.get(
            `${import.meta.env.VITE_API_URL}/users/${studentId}`
          );
          const user = userResponse.data;
          return {
            studentId,
            fullName: user.full_name,
            points: points[studentId],
            email: user.email,
          };
        });

        const rankings = await Promise.all(rankingPromises);
        rankings.sort((a, b) => b.points - a.points);
        setRankings(rankings);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };

    fetchRankings();
  }, []);

  const getTrophyIcon = (rank) => {
    if (rank === 1) {
      return <FaTrophy className="text-yellow-500" />;
    } else if (rank === 2) {
      return <FaTrophy className="text-gray-400" />;
    } else if (rank === 3) {
      return <FaTrophy className="text-orange-500" />;
    }
    return null;
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Event Rankings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Points</th>
              </tr>
            </thead>
            <tbody>
              {rankings.length > 0 ? (
                rankings.map((rank, index) => (
                  <tr
                    key={rank.studentId}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-4 text-gray-800 font-medium flex items-center">
                      {index + 1} {getTrophyIcon(index + 1)}
                    </td>
                    <td className="p-4 text-gray-700">{rank.fullName}</td>
                    <td className="p-4 text-gray-700">{rank.email}</td>
                    <td className="p-4 text-gray-700">{rank.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    Ranking Not Done Yet!!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
