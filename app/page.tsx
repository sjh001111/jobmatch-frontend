"use client";
import { useState } from "react";

export default function Home() {
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [jobPosting, setJobPosting] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [responseLanguage, setResponseLanguage] = useState("korean");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const analyseMatch = async () => {
    if (!resumeFiles.length || !jobPosting) {
      setResult("Please upload resume and enter job posting!");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      // FormData로 파일 + 텍스트 전송
      const formData = new FormData();

      // 파일들 추가
      resumeFiles.forEach((file, index) => {
        formData.append(`resume_files`, file);
      });
      additionalFiles.forEach((file, index) => {
        formData.append(`additional_files`, file);
      });

      // 텍스트 데이터 추가
      formData.append("job_posting", jobPosting);
      formData.append("expected_salary", expectedSalary);
      formData.append("additional_info", additionalInfo);
      formData.append("response_language", responseLanguage);

      const API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000"
          : "https://your-backend.railway.app";

      const response = await fetch(`${API_URL}/analyse`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(`나중에 수정할 것\n${data.test}`);
    } catch (error) {
      console.log("Error:", error);
      setResult("Analysis failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
            JobMatch AI
          </h1>
          <p className="text-xl text-gray-300">
            AI-powered resume and job posting compatibility analysis
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Resume & Files */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></span>
                Resume & Documents
              </h2>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Resume (PDF/DOCX) *
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => {
                    if (e.target.files) {
                      setResumeFiles(Array.from(e.target.files));
                    }
                  }}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:from-blue-700 hover:file:to-purple-700 file:transition-all file:duration-200 border border-slate-600 rounded-lg bg-slate-700/50 p-2"
                />
              </div>

              {/* Additional Files */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Additional Documents (Portfolio, Transcript, etc.)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.doc,.jpg,.png"
                  onChange={(e) => {
                    if (e.target.files) {
                      setAdditionalFiles(Array.from(e.target.files));
                    }
                  }}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-emerald-600 file:to-teal-600 file:text-white hover:file:from-emerald-700 hover:file:to-teal-700 file:transition-all file:duration-200 border border-slate-600 rounded-lg bg-slate-700/50 p-2"
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Expected Salary (Annual)
                </label>
                <input
                  type="text"
                  value={expectedSalary}
                  onChange={(e) => setExpectedSalary(e.target.value)}
                  placeholder="e.g., $80,000 or 80,000원"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Additional Information */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Additional Information
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any additional information you'd like to include..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Right Column - Job Posting */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></span>
                Job Posting
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Job Posting Content *
                </label>
                <textarea
                  value={jobPosting}
                  onChange={(e) => setJobPosting(e.target.value)}
                  placeholder="Paste the complete job posting here..."
                  rows={12}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Response Language */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Analysis Language
                </label>
                <select
                  value={responseLanguage}
                  onChange={(e) => setResponseLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="korean" className="bg-slate-800">
                    한국어 (Korean)
                  </option>
                  <option value="english" className="bg-slate-800">
                    English
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Analyse Button */}
          <div className="mt-10">
            <button
              onClick={analyseMatch}
              disabled={isLoading || !resumeFiles.length || !jobPosting}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                isLoading || !resumeFiles.length || !jobPosting
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/40"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analysing compatibility...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔍</span>
                  Analyse
                </span>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-900/20 via-blue-900/20 to-purple-900/20 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full mr-3"></span>
                Analysis Result
              </h3>
              <div className="text-gray-200 whitespace-pre-wrap">{result}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
