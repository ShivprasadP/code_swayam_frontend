import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Student_Request = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/student-requests`
        );
        const requestsData = response.data;

        const detailedRequests = await Promise.all(
          requestsData.map(async (request) => {
            const studentResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/users/${request.studentId}`
            );
            const eventResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/events/${request.eventId}`
            );
            return {
              ...request,
              student: studentResponse.data,
              event: eventResponse.data,
            };
          })
        );

        setRequests(detailedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const acceptAllRequests = async () => {
    const confirmAcceptAll = window.confirm(
      "Are you sure you want to accept all requests?"
    );
    if (confirmAcceptAll) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/student-requests`, {
          status: "approved",
        });
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.status === "pending"
              ? { ...request, status: "approved" }
              : request
          )
        );
        toast.success("All requests approved successfully!");
      } catch (error) {
        console.error("Error accepting all requests:", error);
        toast.error("Failed to accept all requests");
      }
    }
  };

  const rejectAllRequests = async () => {
    const confirmRejectAll = window.confirm(
      "Are you sure you want to reject all requests?"
    );
    if (confirmRejectAll) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/student-requests`, {
          status: "rejected",
        });
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.status === "pending"
              ? { ...request, status: "rejected" }
              : request
          )
        );
        toast.warning("All requests rejected successfully!");
      } catch (error) {
        console.error("Error rejecting all requests:", error);
        toast.error("Failed to reject all requests");
      }
    }
  };

  const acceptAllProcessedRequests = async () => {
    const confirmAcceptAll = window.confirm(
      "Are you sure you want to accept all processed requests?"
    );
    if (confirmAcceptAll) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/student-requests`, {
          status: "approved",
        });
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.status === "rejected"
              ? { ...request, status: "approved" }
              : request
          )
        );
        toast.success("All processed requests approved successfully!");
      } catch (error) {
        console.error("Error accepting all processed requests:", error);
        toast.error("Failed to accept all processed requests");
      }
    }
  };

  const rejectAllProcessedRequests = async () => {
    const confirmRejectAll = window.confirm(
      "Are you sure you want to reject all processed requests?"
    );
    if (confirmRejectAll) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/student-requests`, {
          status: "rejected",
        });
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.status === "approved"
              ? { ...request, status: "rejected" }
              : request
          )
        );
        toast.success("All processed requests rejected successfully!");
      } catch (error) {
        console.error("Error rejecting all processed requests:", error);
        toast.error("Failed to reject all processed requests");
      }
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/student-requests/${requestId}`,
        {
          status: "approved",
        }
      );
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: "approved" }
            : request
        )
      );
      toast.success(`Request approved successfully!`);
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this request?"
    );
    if (confirmReject) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/student-requests/${requestId}`,
          {
            status: "rejected",
          }
        );
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "rejected" }
              : request
          )
        );
        toast.warning(`Request rejected successfully!`);
      } catch (error) {
        console.error("Error rejecting request:", error);
        toast.error("Failed to reject request");
      }
    }
  };

  const handleDelete = async (requestId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/student-requests/${requestId}`
        );
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestId)
        );
        toast.warning(`Request deleted successfully!`);
      } catch (error) {
        console.error("Error deleting request:", error);
        toast.error("Failed to delete request");
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-500";
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "";
    }
  };

  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const processedRequests = requests.filter(
    (request) => request.status !== "pending"
  );

  return (
    <div className="p-8 bg-orange-50 min-h-screen">
      <div className="max-w-6xl mx-auto border-l-8 border-amber-500 bg-white shadow-lg rounded-lg p-6 transition-transform transform">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          Pending Student Requests
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse border border-amber-500 shadow-md bg-white transition-transform transform">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="p-3 border border-orange-300 text-left">ID</th>
                <th className="p-3 border border-orange-300 text-left">
                  Student Name
                </th>
                <th className="p-3 border border-orange-300 text-left">
                  Email
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Phone
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Class & Div
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Event Name
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Status
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
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : pendingRequests.length > 0 ? (
                pendingRequests.map((request, index) => (
                  <tr
                    key={index}
                    className="border-b border-orange-300 hover:bg-orange-200 transition-all"
                  >
                    <td className="p-3 border border-orange-300 text-left">
                      {index + 1}
                    </td>
                    <td className="p-3 border border-orange-300 text-left">
                      {request.student.full_name}
                    </td>
                    <td className="p-3 border border-orange-300 text-left">
                      {request.student.email}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {request.student.phone_number}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">{`${request.student.class} ${request.student.div}`}</td>
                    <td className="p-3 border border-orange-300 text-center">
                      {request.event.title}
                    </td>
                    <td
                      className={`p-3 border border-orange-300 text-center font-semibold ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleAccept(request._id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
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
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No Pending Student Requests!!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          Processed Student Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-amber-500 shadow-md bg-white transition-transform transform">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="p-3 border border-orange-300 text-left">ID</th>
                <th className="p-3 border border-orange-300 text-left">
                  Student Name
                </th>
                <th className="p-3 border border-orange-300 text-left">
                  Email
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Phone
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Class & Div
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Event Name
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  Status
                </th>
                <th className="p-3 border border-orange-300 text-center">
                  <div className="flex flex-col items-center">
                    <span>Action</span>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={acceptAllProcessedRequests}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-all"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={rejectAllProcessedRequests}
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
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : processedRequests.length > 0 ? (
                processedRequests.map((request, index) => (
                  <tr
                    key={index}
                    className="border-b border-orange-300 hover:bg-orange-200 transition-all"
                  >
                    <td className="p-3 border border-orange-300 text-left">
                      {index + 1}
                    </td>
                    <td className="p-3 border border-orange-300 text-left">
                      {request.student.full_name}
                    </td>
                    <td className="p-3 border border-orange-300 text-left">
                      {request.student.email}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      {request.student.phone_number}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">{`${request.student.class} ${request.student.div}`}</td>
                    <td className="p-3 border border-orange-300 text-center">
                      {request.event.title}
                    </td>
                    <td
                      className={`p-3 border border-orange-300 text-center font-semibold ${getStatusClass(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </td>
                    <td className="p-3 border border-orange-300 text-center">
                      <div className="flex justify-center space-x-2">
                        {request.status === "approved" && (
                          <>
                            <button
                              onClick={() => handleReject(request._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {request.status === "rejected" && (
                          <>
                            <button
                              onClick={() => handleAccept(request._id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                            >
                              Accept
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No Processed Student Requests!!!!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Student_Request;
