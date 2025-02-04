import "react";
import ranks from "./ranks";

const Ranking = () => {

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Event Rankings</h2>

        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
          <p className="text-xl font-semibold text-gray-700">Event Title: <span className="text-gray-900">Coding Championship 2025</span></p>
          <p className="text-lg font-medium text-gray-600 mt-2">Date: <span className="text-gray-800">March 10, 2025</span></p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Class - Div</th>
                <th className="p-4 text-left">College</th>
                <th className="p-4 text-left">Contact</th>
                <th className="p-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {ranks.length > 0 ? (
                ranks.map((rank, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="p-4 text-gray-800 font-medium">{rank.rank}</td>
                    <td className="p-4 text-gray-700">{rank.name}</td>
                    <td className="p-4 text-gray-700">{rank.classDiv}</td>
                    <td className="p-4 text-gray-700">{rank.college}</td>
                    <td className="p-4 text-gray-700">{rank.contact}</td>
                    <td className="p-4 text-gray-700">{rank.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
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
