export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-4xl w-full">
        <h1 className="text-6xl font-bold text-center mb-4">
          Job Match
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Score job descriptions based on your resume and profile
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">
              Resume
            </label>
            <textarea 
              className="w-full h-40 border border-gray-300 rounded-lg p-4" 
              placeholder="Enter your resume here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <textarea 
              className="w-full h-40 border border-gray-300 rounded-lg p-4"
              placeholder="Enter the job description here..."
            />
          </div>
        </div>
        
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg text-lg transition duration-200">
          🔍 Start
        </button>
      </div>
    </main>
  );
}