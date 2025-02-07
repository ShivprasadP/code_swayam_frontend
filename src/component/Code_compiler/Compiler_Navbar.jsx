import React, { useEffect, useState } from "react";
import Select from "react-select";
import { FaTrophy, FaMedal } from "react-icons/fa";
import axios from "axios";

const CodeNavbar = ({
  userLang,
  setUserLang,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
  problemId,
}) => {
  const [languages, setLanguages] = useState([]);
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  const fontSizes = [
    { value: 16, label: "16px" },
    { value: 18, label: "18px" },
    { value: 20, label: "20px" },
    { value: 22, label: "22px" },
    { value: 24, label: "24px" },
    { value: 26, label: "26px" },
    { value: 28, label: "28px" },
    { value: 30, label: "30px" },
    { value: 32, label: "32px" },
  ];

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/problem-stmt/${problemId}/languages`
        );
        const languageOptions = response.data.map((lang) => ({
          value: lang.toLowerCase(),
          label: lang.charAt(0).toUpperCase() + lang.slice(1),
        }));
        setLanguages(languageOptions);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    if (problemId) {
      fetchLanguages();
    }
  }, [problemId]);

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg p-4 flex items-center justify-between rounded-lg animate-fade-in">
      <div className="flex items-center space-x-3">
        <FaTrophy className="text-white text-3xl animate-pulse" />
        <h1 className="text-white text-2xl font-bold tracking-wide">
          Code_swayam Compiler
        </h1>
        <FaMedal className="text-yellow-300 text-3xl animate-bounce" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold">Language</span>
          <Select
            options={languages}
            value={languages.find((lang) => lang.value === userLang)}
            onChange={(e) => setUserLang(e.value.toLowerCase())}
            placeholder="Select Language"
            className="w-36"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "none",
                color: "white",
              }),
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white font-semibold">Theme</span>
          <Select
            options={themes}
            value={themes.find((theme) => theme.value === userTheme)}
            onChange={(e) => setUserTheme(e.value)}
            placeholder="Select Theme"
            className="w-36"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "none",
                color: "white",
              }),
            }}
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="text-white font-semibold">Font Size</label>
          <Select
            options={fontSizes}
            value={fontSizes.find((size) => size.value === fontSize)}
            onChange={(e) => setFontSize(e.value)}
            className="w-36"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                border: "none",
                color: "white",
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeNavbar;
