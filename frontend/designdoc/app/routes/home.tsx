"use client";
import React, { useState, useEffect } from "react";

function Home() {
  // Theme state (light/dark mode)
  const [isDarkMode, setIsDarkMode] =
    useState();
    // localStorage.getItem("theme") === "dark"

  // Store user responses
  const [answers, setAnswers] = useState({
    persecution: null,
    reason: null,
    inCanada: null,
    deniedBefore: null,
    criminalRecord: null,
  });

  const [result, setResult] = useState("");

  // Apply theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
    //localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Toggle theme function
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Handle user responses
  const handleAnswer = (question, answer) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  // Check eligibility logic
  const checkEligibility = () => {
    const { persecution, reason, inCanada, deniedBefore, criminalRecord } =
      answers;

    if (
      persecution === "yes" &&
      reason === "yes" &&
      inCanada === "yes" &&
      deniedBefore === "no" &&
      criminalRecord === "no"
    ) {
      setResult("✅ You may be eligible for refugee status.");
    } else if (criminalRecord === "yes") {
      setResult("❌ A criminal record may impact your eligibility.");
    } else {
      setResult("⚠️ Your case may require further review.");
    }
  };

  return (
    <div className="min-h-screen transition duration-500 p-10 bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold">Refugee Eligibility Checker</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Questions Section */}
      <div className="mt-6 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Answer the following questions:
        </h2>

        {/* Question List */}
        <div className="space-y-4">
          {[
            {
              key: "persecution",
              text: "Are you facing persecution in your home country?",
            },
            {
              key: "reason",
              text: "Is it based on race, religion, nationality, politics, or social group?",
            },
            {
              key: "inCanada",
              text: "Are you in Canada or planning to claim asylum at the border?",
            },
            {
              key: "deniedBefore",
              text: "Have you been denied refugee status before?",
            },
            {
              key: "criminalRecord",
              text: "Do you have a criminal record?",
            },
          ].map(({ key, text }) => (
            <div key={key}>
              <p className="mb-2">{text}</p>
              <button
                className={`px-4 py-2 rounded-lg mx-2 ${
                  answers[key] === "yes"
                    ? "bg-green-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                onClick={() => handleAnswer(key, "yes")}
              >
                Yes
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  answers[key] === "no"
                    ? "bg-red-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
                onClick={() => handleAnswer(key, "no")}
              >
                No
              </button>
            </div>
          ))}
        </div>

        {/* Eligibility Check Button */}
        <div className="mt-6">
          <button
            className="bg-blue-500 px-6 py-3 text-white rounded-lg hover:bg-blue-600 transition duration-300 text-lg font-semibold shadow-md"
            onClick={checkEligibility}
          >
            Check Eligibility
          </button>
        </div>

        {/* Display Eligibility Result */}
        {result && (
          <div className="mt-4 p-4 rounded-lg shadow-md text-lg font-semibold">
            {result.includes("✅") ? (
              <div className="bg-green-300 dark:bg-green-500 p-4 rounded-lg">
                {result}
              </div>
            ) : result.includes("❌") ? (
              <div className="bg-red-300 dark:bg-red-500 p-4 rounded-lg">
                {result}
              </div>
            ) : (
              <div className="bg-yellow-300 dark:bg-yellow-500 p-4 rounded-lg">
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
