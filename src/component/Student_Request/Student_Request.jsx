import React from "react";
import srdetails from "./srdetails";

const Student_Request = () => {
  const acceptAllRequests = () => {
    alert("All requests accepted successfully!");
  };

  const rejectAllRequests = () => {
    alert("All requests rejected!");
  };

  return (
    <div className="p-8  bg-orange-50 min-h-screen mt-20">
      <div className="max-w-6xl mx-auto border-l-8 border-amber-500 bg-white shadow-lg rounded-lg p-6 transition-transform transform ">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          Student Requests
        </h2>

        <div className="overflow-x-auto ">
          <table className="w-full border-collapse border border-amber-500 shadow-md bg-white transition-transform transform ">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="p-3 border border-orange-300 text-left">ID</th>
                <th className="p-3 border border-orange-300 text-left">
                  Full Name
                </th>
                <th className="p-3 border border-orange-300 text-left">
                  Email
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Phone
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Gender
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Address
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Class
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Div
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Department
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  <div className="flex flex-col items-center">
                    <span>Action</span>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={acceptAllRequests}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-all"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={rejectAllRequests}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition-all"
                      >
                        Reject All
                      </button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {srdetails.length > 0 ? (
                srdetails.map((student, index) => (
                  <tr
                    key={index}
                    className="border-b border-orange-300 hover:bg-orange-200 transition-all"
                  >
                    <td className="p-3 border border-orange-300 text-left">
                      {index + 1}
                    </td>
                    <td className="p-3 border border-orange-300 text-left">
                      {student.full_name}
                    </td>
                    <td className="p-3 border border-orange-300 text-left">
                      {student.email}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {student.phone_number}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {student.gender}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {student.address}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {student.class}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {student.div}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {student.department}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => alert("Request Accepted Successfully")}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => alert("Request Denied")}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-4 text-center text-gray-500">
                    No Student Requests!!!!
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
