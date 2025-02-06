import React from "react";
import Select from "react-select";
import { FaTrophy, FaMedal } from "react-icons/fa";

const CodeNavbar = ({ userLang, setUserLang, userTheme, setUserTheme, fontSize, setFontSize }) => {
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg p-4 flex items-center justify-between rounded-lg animate-fade-in">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <FaTrophy className="text-white text-3xl animate-pulse" />
        <h1 className="text-white text-2xl font-bold tracking-wide">Code_swayam Compiler</h1>
        <FaMedal className="text-yellow-300 text-3xl animate-bounce" />
      </div>

      {/* Language Selector */}
      <div className="flex items-center space-x-4 ">
        <div className="flex flex-col items-center ">
          <span className="text-white font-semibold">Language</span>
          <Select
            options={languages}
            value={languages.find((lang) => lang.value === userLang)}
            onChange={(e) => setUserLang(e.value)}
            placeholder="Select Language"
            className="w-36"
            styles={{
              control: (base) => ({ ...base, backgroundColor: "white", border: "none", color: "white" }),
            }}
          />
        </div>

        {/* Theme Selector */}
        <div className="flex flex-col items-center ">
          <span className="text-white font-semibold ">Theme</span>
          <Select
            options={themes}
            value={themes.find((theme) => theme.value === userTheme)}
            onChange={(e) => setUserTheme(e.value)}
            placeholder="Select Theme"
            className="w-36"
            styles={{
              control: (base) => ({ ...base, backgroundColor: "white", border: "none", color: "white" }),
            }}
          />
        </div>

        {/* Font Size Selector */}
        <div className="flex flex-col items-center">
          <label className="text-white font-semibold">Font Size</label>
          <input
            type="range"
            min="18"
            max="30"
            value={fontSize}
            step="2"
            onChange={(e) => setFontSize(e.target.value)}
            className="w-32 cursor-pointer accent-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeNavbar;
