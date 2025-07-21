"use client";

import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000'
  : 'https://jobmatch-backend-production.up.railway.app'

  const analyzeMatch = async () => {
    if (!resumeText || !jobText) {
      setResult("이력서와 채용공고를 모두 입력해주세요!");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch(`${API_URL}/analyse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resumeText,
          job_posting: jobText,
        }),
      });

      const data = await response.json();
      setResult(`${data.test}`);
    } catch (error) {
      setResult("분석 중 오류가 발생했습니다.");
    }

    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-6xl font-bold text-center mb-4">Job Match</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Score job descriptions based on your resume and profile
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Resume</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full h-40 border border-gray-300 rounded-lg p-4"
              placeholder="Enter your resume here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="w-full h-40 border border-gray-300 rounded-lg p-4"
              placeholder="Enter the job description here..."
            />
          </div>
        </div>

        <button
          onClick={analyzeMatch}
          disabled={isLoading}
          className={`w-full ${
            isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-4 px-6 rounded-lg text-lg transition duration-200`}
        >
          {isLoading ? "🔄 분석 중..." : "🔍 매칭 분석하기"}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-center text-lg font-semibold text-black">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
