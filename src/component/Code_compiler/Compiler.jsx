import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import CodeNavbar from "./Compiler_Navbar";
import Axios from "axios";
import { FaTrophy, FaMedal } from "react-icons/fa";
import spinner from "./spinner.svg";
import { toast, ToastContainer } from "react-toastify";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function Compiler({ problemId }) {
  const [userCode, setUserCode] = useState(`# Enter your code here`);
  const [userLang, setUserLang] = useState(null);
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [testResults, setTestResults] = useState({ passed: 0, failed: 0 });
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showCompiler, setShowCompiler] = useState(true);
  const [rewardPoints, setRewardPoints] = useState(0);

  const { width, height } = useWindowSize();
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
    const fetchProblemStatement = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_API_URL}/problem-stmt/${problemId}`
        );
        setRewardPoints(response.data.rewardPoints);
      } catch (error) {
        console.error("Error fetching problem statement:", error);
        toast.error("Failed to fetch problem statement.");
      }
    };

    const fetchTestCases = async () => {
      try {
        const response = await Axios.get(
          `${import.meta.env.VITE_API_URL}/test-cases/${problemId}`
        );
        setTestCases(response.data);
        if (response.data.length > 0) {
          setUserInput(response.data[0].input);
        }
      } catch (error) {
        console.error("Error fetching test cases:", error);
        toast.error("Failed to fetch test cases.");
      }
    };

    fetchProblemStatement();
    fetchTestCases();
  }, [problemId]);

  const options = { fontSize: fontSize };

  const compile = async () => {
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

    try {
      let passed = 0;
      let failed = 0;
      let finalOutput = "";

      for (const testCase of testCases) {
        const inputs = testCase.input.split(",").map((input) => input.trim());
        const response = await Axios.post(
          `${import.meta.env.VITE_API_URL}/compile`,
          {
            code: userCode,
            language: userLang,
            input: inputs.join("\n"),
            problemId: problemId,
          }
        );

        const output = response.data.stdout || response.data.stderr;
        finalOutput += `Input: ${testCase.input}\nExpected Output: ${testCase.expected_output}\nActual Output: ${output}\n\n`;

        if (output.trim() === testCase.expected_output.trim()) {
          passed++;
        } else {
          failed++;
        }
      }

      setUserOutput(finalOutput);
      setTestResults({ passed, failed });

      if (passed === testCases.length) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
        toast.success(`All test cases passed! 🎉`);
        setShowSubmitButton(true);
      } else if (passed > 0) {
        setShowSubmitButton(true);
        toast.warning(
          `${passed} test cases passed, ${failed} test cases failed.`
        );
      } else {
        toast.error(`All test cases failed 😢`);
      }
    } catch (err) {
      console.error(err);
      setUserOutput(
        "Error: " + (err.response ? err.response.data.error : err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const clearOutput = () => {
    setUserOutput("");
  };

  const handleSubmit = async () => {
    const pointsEarned = Math.floor(
      rewardPoints - testResults.failed * (rewardPoints / testCases.length)
    );
    const confirmSubmit =
      testResults.failed > 0
        ? window.confirm(
            `You have ${testResults.failed} failed test cases. You will earn ${pointsEarned} points. Do you want to submit?`
          )
        : true;

    if (confirmSubmit) {
      try {
        const response = await Axios.post(
          `${import.meta.env.VITE_API_URL}/solutions/add`,
          {
            problemStatementId: problemId,
            studentId: JSON.parse(sessionStorage.getItem("user"))._id,
            points: pointsEarned,
          }
        );
        toast.success("Solution submitted successfully!");
        setShowCompiler(false);
      } catch (error) {
        console.error("Error submitting solution:", error);
        toast.error("Failed to submit solution.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {showConfetti && <Confetti width={width} height={height} />}

      {showCompiler && (
        <>
          <CodeNavbar
            userLang={userLang}
            setUserLang={setUserLang}
            userTheme={userTheme}
            setUserTheme={setUserTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            problemId={problemId}
          />

          <div className="flex flex-col lg:flex-row p-6 gap-6">
            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-4 border-4 border-amber-500 relative">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-orange-500">
                  Code Editor
                </h2>
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

            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-4 border-4 border-orange-500">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-orange-500">
                  Input / Output
                </h2>
                <FaMedal className="text-yellow-400 text-3xl animate-bounce" />
              </div>

              <div className="mb-4">
                <label className="text-lg font-semibold text-gray-700">
                  Input:
                </label>
                <textarea
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                  rows="4"
                  placeholder="Enter input here..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>

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

              <button
                className="w-full bg-gradient-to-r from-orange-300 to-amber-400 text-white font-bold py-2 rounded-lg hover:scale-105 transition-all shadow-md"
                onClick={clearOutput}
              >
                Clear Output ❌
              </button>
            </div>
          </div>

          {showSubmitButton && (
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all shadow-md"
                onClick={handleSubmit}
              >
                Submit Solution ✅
              </button>
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Compiler;
