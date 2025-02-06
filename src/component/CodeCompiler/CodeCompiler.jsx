import React, { useRef, useState, useEffect } from "react";

const CodeCompiler = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const compilerRef = useRef(null);

  // Enter Fullscreen Mode
  const enterFullScreen = () => {
    if (compilerRef.current.requestFullscreen) {
      compilerRef.current.requestFullscreen();
    } else if (compilerRef.current.mozRequestFullScreen) {
      compilerRef.current.mozRequestFullScreen();
    } else if (compilerRef.current.webkitRequestFullscreen) {
      compilerRef.current.webkitRequestFullscreen();
    } else if (compilerRef.current.msRequestFullscreen) {
      compilerRef.current.msRequestFullscreen();
    }
    document.body.style.overflow = "hidden"; // 🛑 Disable Scrolling
    setIsFullScreen(true);
  };

  // Exit Fullscreen Mode
  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    document.body.style.overflow = "auto"; // ✅ Restore Scrolling
    setIsFullScreen(false);
  };

  // Dynamically adjust iframe size when fullscreen is toggled
  useEffect(() => {
    const handleResize = () => {
      if (isFullScreen) {
        compilerRef.current.style.height = `${window.innerHeight}px`; // Fullscreen height
      } else {
        compilerRef.current.style.height = "auto"; // Reset height when not fullscreen
      }
    };

    // Listen to resize events
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isFullScreen]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-6">
      <div
        ref={compilerRef}
        className="w-full max-w-7xl bg-white shadow-xl rounded-2xl p-4 relative overflow-hidden h-[900px] sm:h-[700px] md:h-[800px]" // Adjusted default height with responsive classes
      >
        {/* Title & Fullscreen Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800">Online Code Compiler</h2>
          <button
            onClick={isFullScreen ? exitFullScreen : enterFullScreen}
            className={`px-4 py-2 rounded-lg shadow-md transition-all ${
              isFullScreen
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>
        </div>

        {/* JDoodle Compiler in an Iframe */}
        <div className="border rounded-xl shadow-md w-full h-full overflow-hidden">
          <iframe
            src="https://www.jdoodle.com/embed/v1/b2d86578c015dcef"
            title="JDoodle Compiler"
            className="w-full h-full rounded-2xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodeCompiler;
