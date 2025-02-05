import React from "react";
import srdetails from "./srdetails";

const Student_Request = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-amber-500 to-orange-400 text-white">
                <th className="p-4 text-left text-2xl w-16">Rank</th>
                <th className="p-4 text-left text-2xl w-40">Name</th>
                <th className="p-4 text-left text-2xl w-32">Class - Div</th>
                <th className="p-4 text-left text-2xl w-48">College</th>
                <th className="p-4 text-left text-2xl w-40">Contact</th>
                <th className="p-4 text-left text-2xl w-56">Email</th>
                <th className="p-4 text-center text-2xl w-40">Action</th>
              </tr>
            </thead>
            <tbody>
              {srdetails.length > 0 ? (
                srdetails.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="p-4 text-gray-800 font-medium">{student.rank}</td>
                    <td className="p-4 text-gray-700">{student.name}</td>
                    <td className="p-4 text-gray-700">{student.classDiv}</td>
                    <td className="p-4 text-gray-700">{student.college}</td>
                    <td className="p-4 text-gray-700">{student.contact}</td>
                    <td className="p-4 text-gray-700">{student.email}</td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => alert("Request Accepted Successfully")}
                          className="bg-gradient-to-b from-amber-500 to-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => alert("Request Denied")}
                          className="bg-gradient-to-b from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No Student Request!!!!
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

export default Student_Request;
