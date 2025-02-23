"use client";
import React, { useState, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI immigration consultant for Canada. I can provide information about Canadian immigration processes and requirements. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  // Add new state for tracking answers
  const [answers, setAnswers] = useState({
    persecution: "",
    reason: "",
    inCanada: "",
    deniedBefore: "",
    criminalRecord: ""
  });

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [isDarkMode]);

  // const toggleTheme = () => {
  //   setIsDarkMode(prev => !prev);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user" as const, content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add function to handle answer selection
  const handleAnswer = (question: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  // Add function to generate eligibility summary
  const checkEligibility = async () => {
    const summary = `
      Eligibility Check Summary:
      -------------------------
      1. Are you facing persecution in your home country? ${answers.persecution}
      2. Is it based on race, religion, nationality, politics, or social group? ${answers.reason}
      3. Are you in Canada or planning to claim asylum at the border? ${answers.inCanada}
      4. Have you been denied refugee status before? ${answers.deniedBefore}
      5. Do you have a criminal record? ${answers.criminalRecord}
    `;

    try {
      const response = await fetch("http://localhost:8000/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: summary }),
      });

      const advice = await response.json();

      setMessages(prev => [...prev, 
        { role: "user", content: "Check my refugee eligibility" }
      ]);
      
      setMessages(prev => [...prev, 
        { role: "assistant", content: advice.message }
      ]);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen transition duration-500 p-10 bg-white text-black dark:bg-gray-900 dark:text-white">



      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold">AI Immigration Consultant & Refugee Checker</h1>
          <nav>
            <ul className="flex space-x-6">
            <li>
                <a href="/" className="text-xl hover:text-blue-500 transition">Home</a>
              </li>
              <li>
                <a href="/document" className="text-xl hover:text-blue-500 transition">Document Help</a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Your existing theme toggle button (commented out) remains here */}
      </div>



      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* AI Immigration Consultant */}
        <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">AI Immigration Consultant</h2>
          <div className="h-96 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 mb-2 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-black dark:text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-lg p-4">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              Send
            </button>
          </form>
        </div>



        {/* Refugee Eligibility Checker */}
        <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Refugee Eligibility Checker</h2>
          {["persecution", "reason", "inCanada", "deniedBefore", "criminalRecord"].map((key) => (
            <div key={key} className="mb-4">
              <p className="mb-2">
                {key === "persecution"
                  ? "Are you facing persecution in your home country?"
                  : key === "reason"
                  ? "Is it based on race, religion, nationality, politics, or social group?"
                  : key === "inCanada"
                  ? "Are you in Canada or planning to claim asylum at the border?"
                  : key === "deniedBefore"
                  ? "Have you been denied refugee status before?"
                  : "Do you have a criminal record?"}
              </p>
              <button 
                onClick={() => handleAnswer(key, "Yes")}
                className={`px-4 py-2 ${answers[key] === "Yes" ? 'bg-green-700' : 'bg-green-500'} text-white rounded-lg mr-2 hover:bg-green-600`}
              >
                Yes
              </button>
              <button 
                onClick={() => handleAnswer(key, "No")}
                className={`px-4 py-2 ${answers[key] === "No" ? 'bg-red-700' : 'bg-red-500'} text-white rounded-lg hover:bg-red-600`}
              >
                No
              </button>
            </div>
          ))}
          <button 
            onClick={checkEligibility}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Check Eligibility
          </button>
        </div>

        

      </div>
    </div>
  );
}

export function meta() {
  return [
    { title: "Immigration Assistant" },
    { name: "description", content: "AI Immigration Consultant and Refugee Checker for Canada" },
  ];
}
