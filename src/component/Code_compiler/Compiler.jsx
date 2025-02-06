import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import CodeNavbar from "./Compiler_Navbar";
import Axios from "axios";
import { FaTrophy, FaMedal } from "react-icons/fa";
import spinner from "./spinner.svg";
import { toast, ToastContainer } from "react-toastify";
import Confetti from "react-confetti"; // 🎉 Import Confetti effect
import { useWindowSize } from "react-use";

function Compiler({ problemId }) {
  const [userCode, setUserCode] = useState(`# Enter your code here`);
  const [userLang, setUserLang] = useState(null);
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // 🎉 State for confetti

  const { width, height } = useWindowSize(); // Get screen width and height for confetti
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = () => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user || !user.coordinator_role) {
        sessionStorage.removeItem("user");
        navigate("/login", {
          state: {
            errorMessage: "Please log in as a coordinator to access this page.",
          },
        });
      }
    };

    checkUserSession();
  }, [navigate]);

  const options = { fontSize: fontSize };

  const compile = () => {
    if (!userLang) {
      toast.error("Please select a programming language.");
      return;
    }

    if (
      userCode.trim() === "" ||
      userCode.trim() === "# Enter your code here"
    ) {
      toast.error("Please enter your code.");
      return;
    }

    setLoading(true);

    Axios.post(`${import.meta.env.VITE_API_URL}/compile`, {
      code: userCode,
      language: userLang,
      input: userInput,
      problemId: problemId,
    })
      .then((res) => {
        setUserOutput(res.data.stdout || res.data.stderr);

        // 🎉 Show confetti if compilation is successful
        if (res.data.stdout) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 4 sec
        }
      })
      .catch((err) => {
        console.error(err);
        setUserOutput(
          "Error: " + (err.response ? err.response.data.error : err.message)
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to clear output
  const clearOutput = () => {
    setUserOutput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* 🎉 Confetti Effect (Appears only when showConfetti is true) */}
      {showConfetti && <Confetti width={width} height={height} />}

      {/* Code Navbar */}
      <CodeNavbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        problemId={problemId}
      />

      {/* Main Code Editor & Output Container */}
      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* Code Editor Section */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-4 border-4 border-amber-500 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-orange-500">Code Editor</h2>
            <FaTrophy className="text-yellow-500 text-3xl animate-pulse" />
          </div>
          <Editor
            options={options}
            height="70vh"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => setUserCode(value)}
            className="border border-gray-300 rounded-lg"
          />
          <button
            className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 rounded-lg hover:scale-105 transition-all shadow-md"
            onClick={compile}
          >
            Run Code 🚀
          </button>
        </div>

        {/* Input / Output Section */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-4 border-4 border-orange-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-orange-500">
              Input / Output
            </h2>
            <FaMedal className="text-yellow-400 text-3xl animate-bounce" />
          </div>

          {/* Input Section */}
          <div className="mb-4">
            <label className="text-lg font-semibold text-gray-700">
              Input:
            </label>
            <textarea
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              rows="4"
              placeholder="Enter input here..."
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>

          {/* Output Section */}
          <div className="mb-4">
            <label className="text-lg font-semibold text-gray-700">
              Output:
            </label>
            <div className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50">
              {loading ? (
                <div className="flex items-center justify-center">
                  <img
                    src={spinner}
                    alt="Loading..."
                    className="w-8 h-8 animate-spin"
                  />
                </div>
              ) : (
                <pre className="text-gray-700">
                  {userOutput || "No output yet"}
                </pre>
              )}
            </div>
          </div>

          {/* Clear Output Button */}
          <button
            className="w-full bg-gradient-to-r from-orange-300 to-amber-400 text-white font-bold py-2 rounded-lg hover:scale-105 transition-all shadow-md"
            onClick={clearOutput}
          >
            Clear Output ❌
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Compiler;
