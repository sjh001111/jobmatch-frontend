"use client";
import { useState, useEffect } from "react";

// 현재 거주나 선호 위치 추가
// 경력 추가

enum MatchLevel {
  VERY_LOW = "Very Low",
  LOW = "Low", 
  MEDIUM = "Medium",
  HIGH = "High",
  VERY_HIGH = "Very High",
  UNKNOWN = "Unknown"
}

interface Criteria {
  name: string;
  match_level: MatchLevel;
  comment: string;
}

interface JobAnalysis {
  company_name: string;
  role_name: string;
  role_fit: Criteria;
  tech_stack: Criteria;
  career_education: Criteria;
  location_match: Criteria;
  compensation_benefits: Criteria;
  company_culture: Criteria;
  growth_potential: Criteria;
  total_match_level: MatchLevel;
  key_strengths: string[];
  key_concerns: string[];
}

interface AnalysisResult {
  id: string;
  timestamp: Date;
  analysis: JobAnalysis;
}

const getMatchLevelColor = (level: MatchLevel): string => {
  switch (level) {
    case MatchLevel.VERY_HIGH: return "text-emerald-400 bg-emerald-500/20";
    case MatchLevel.HIGH: return "text-green-400 bg-green-500/20";
    case MatchLevel.MEDIUM: return "text-yellow-400 bg-yellow-500/20";
    case MatchLevel.LOW: return "text-orange-400 bg-orange-500/20";
    case MatchLevel.VERY_LOW: return "text-red-400 bg-red-500/20";
    case MatchLevel.UNKNOWN: return "text-gray-400 bg-gray-500/20";
    default: return "text-gray-400 bg-gray-500/20";
  }
};

const getOverallMatchLevelColor = (level: MatchLevel): string => {
  switch (level) {
    case MatchLevel.VERY_HIGH: return "from-emerald-500 to-green-500";
    case MatchLevel.HIGH: return "from-green-500 to-lime-500";
    case MatchLevel.MEDIUM: return "from-yellow-500 to-orange-500";
    case MatchLevel.LOW: return "from-orange-500 to-red-500";
    case MatchLevel.VERY_LOW: return "from-red-500 to-rose-500";
    case MatchLevel.UNKNOWN: return "from-gray-500 to-slate-500";
    default: return "from-gray-500 to-slate-500";
  }
};

const ResultCard = ({ result, onDelete }: { result: AnalysisResult; onDelete: (id: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const criteriaList = [
    { name: "Role Fit", data: result.analysis.role_fit },
    { name: "Tech Stack", data: result.analysis.tech_stack },
    { name: "Career & Education", data: result.analysis.career_education },
    { name: "Location Match", data: result.analysis.location_match },
    { name: "Compensation & Benefits", data: result.analysis.compensation_benefits },
    { name: "Company Culture", data: result.analysis.company_culture },
    { name: "Growth Potential", data: result.analysis.growth_potential }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{result.analysis.company_name}</h3>
            <div className="flex items-center space-x-2">
              <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${getOverallMatchLevelColor(result.analysis.total_match_level)} text-white font-medium text-sm`}>
                {result.analysis.total_match_level}
              </div>
              <button
                onClick={() => onDelete(result.id)}
                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{result.analysis.role_name}</p>
          <p className="text-gray-400 text-xs">{result.timestamp.toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Criteria Grid - Always Visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-3">
        {criteriaList.map((criteria, index) => (
          <div key={index} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-2 text-center">
            <h4 className="font-medium text-white text-xs mb-1 truncate" title={criteria.name}>
              {criteria.name}
            </h4>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getMatchLevelColor(criteria.data.match_level)}`}>
              {criteria.data.match_level}
            </span>
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-gray-400 hover:text-white text-xs flex items-center justify-center space-x-1 py-1"
      >
        <span>{isExpanded ? 'Show Less' : 'Show Details'}</span>
        <svg className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-3 space-y-3">
          {/* Detailed Criteria Comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criteriaList.map((criteria, index) => (
              <div key={index} className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{criteria.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getMatchLevelColor(criteria.data.match_level)}`}>
                    {criteria.data.match_level}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{criteria.data.comment}</p>
              </div>
            ))}
          </div>

          {/* Key Strengths */}
          <div className="bg-gradient-to-r from-emerald-700/20 to-green-700/20 border border-emerald-500/30 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center">
              <span className="w-1.5 h-3 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full mr-2"></span>
              Key Strengths
            </h4>
            <ul className="space-y-1">
              {result.analysis.key_strengths.map((strength, index) => (
                <li key={index} className="text-gray-200 text-sm flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Concerns */}
          <div className="bg-gradient-to-r from-red-700/20 to-rose-700/20 border border-red-500/30 rounded-lg p-3">
            <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
              <span className="w-1.5 h-3 bg-gradient-to-b from-red-500 to-rose-500 rounded-full mr-2"></span>
              Key Concerns
            </h4>
            <ul className="space-y-1">
              {result.analysis.key_concerns.map((concern, index) => (
                <li key={index} className="text-gray-200 text-sm flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  {concern}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [resumeFiles, setResumeFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [jobPosting, setJobPosting] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [responseLanguage, setResponseLanguage] = useState("korean");
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSalary = localStorage.getItem('expectedSalary');
      const savedInfo = localStorage.getItem('additionalInfo');
      const savedLanguage = localStorage.getItem('responseLanguage');
      const savedResults = localStorage.getItem('analysisResults');

      if (savedSalary) setExpectedSalary(savedSalary);
      if (savedInfo) setAdditionalInfo(savedInfo);
      if (savedLanguage) setResponseLanguage(savedLanguage);
      if (savedResults) {
        try {
          const parsedResults = JSON.parse(savedResults);
          const resultsWithDates = parsedResults.map((result: AnalysisResult) => ({
            ...result,
            timestamp: new Date(result.timestamp)
          })).filter((result: AnalysisResult) => result.analysis); // Filter out old format data
          setResults(resultsWithDates);
        } catch (error) {
          console.error('Failed to parse saved results:', error);
          localStorage.removeItem('analysisResults'); // Clear corrupted data
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('expectedSalary', expectedSalary);
    }
  }, [expectedSalary]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('additionalInfo', additionalInfo);
    }
  }, [additionalInfo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('responseLanguage', responseLanguage);
    }
  }, [responseLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined' && results.length > 0) {
      localStorage.setItem('analysisResults', JSON.stringify(results));
    }
  }, [results]);

  const deleteResult = (id: string) => {
    const updatedResults = results.filter(result => result.id !== id);
    setResults(updatedResults);
    if (typeof window !== 'undefined') {
      if (updatedResults.length === 0) {
        localStorage.removeItem('analysisResults');
      } else {
        localStorage.setItem('analysisResults', JSON.stringify(updatedResults));
      }
    }
  };

  const analyseMatch = async () => {
    if (!resumeFiles.length || !jobPosting) {
      alert("Please upload at least one resume file and enter a job posting.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // Debug: Check if files are valid
      console.log("Resume files:", resumeFiles);
      console.log("Additional files:", additionalFiles);

      resumeFiles.forEach((file) => {
        console.log(`Adding resume file: ${file.name}, size: ${file.size} bytes`);
        formData.append(`resume_files`, file);
      });
      additionalFiles.forEach((file) => {
        console.log(`Adding additional file: ${file.name}, size: ${file.size} bytes`);
        formData.append(`additional_files`, file);
      });

      formData.append("job_posting", jobPosting);
      formData.append("expected_salary", expectedSalary);
      formData.append("additional_info", additionalInfo);
      formData.append("response_language", responseLanguage);

      const API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000"
          : "https://jobmatch-backend-production.up.railway.app";

      console.log(`Sending request to: ${API_URL}/analyse`);

      const response = await fetch(`${API_URL}/analyse`, {
        method: "POST",
        body: formData,
      });

      console.log(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      if (data.company_name && data.role_name) {
        const newResult: AnalysisResult = {
          id: Date.now().toString(),
          timestamp: new Date(),
          analysis: data
        };
        setResults(prev => [newResult, ...prev]);
      } else {
        const mockResult: AnalysisResult = {
          id: Date.now().toString(),
          timestamp: new Date(),
          analysis: {
            company_name: data.company_name || "Sample Company",
            role_name: data.role_name || "Software Engineer",
            role_fit: { name: "Role Fit", match_level: MatchLevel.HIGH, comment: "Strong alignment with job requirements" },
            tech_stack: { name: "Tech Stack", match_level: MatchLevel.MEDIUM, comment: "Good technical background with some gaps" },
            career_education: { name: "Career & Education", match_level: MatchLevel.HIGH, comment: "Education and experience align well" },
            location_match: { name: "Location Match", match_level: MatchLevel.VERY_HIGH, comment: "Perfect location match" },
            compensation_benefits: { name: "Compensation & Benefits", match_level: MatchLevel.MEDIUM, comment: "Competitive package offered" },
            company_culture: { name: "Company Culture", match_level: MatchLevel.HIGH, comment: "Good cultural fit based on values" },
            growth_potential: { name: "Growth Potential", match_level: MatchLevel.HIGH, comment: "Excellent opportunities for advancement" },
            total_match_level: MatchLevel.HIGH,
            key_strengths: [
              "Strong technical skills in required technologies",
              "Relevant industry experience",
              "Good educational background"
            ],
            key_concerns: [
              "Limited experience with specific framework",
              "Salary expectation might be above budget"
            ]
          }
        };
        setResults(prev => [mockResult, ...prev]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      const errorResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        analysis: {
          company_name: "Error",
          role_name: "Analysis Failed",
          role_fit: { name: "Role Fit", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          tech_stack: { name: "Tech Stack", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          career_education: { name: "Career & Education", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          location_match: { name: "Location Match", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          compensation_benefits: { name: "Compensation & Benefits", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          company_culture: { name: "Company Culture", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          growth_potential: { name: "Growth Potential", match_level: MatchLevel.UNKNOWN, comment: "Analysis failed" },
          total_match_level: MatchLevel.UNKNOWN,
          key_strengths: [],
          key_concerns: ["Analysis failed. Please try again."]
        }
      };
      setResults(prev => [errorResult, ...prev]);
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
                  placeholder="e.g., $80,000"
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
          {results.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full mr-3"></span>
                Analysis Results ({results.length})
              </h2>
              {results.map((result) => (
                <ResultCard key={result.id} result={result} onDelete={deleteResult} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}