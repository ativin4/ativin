export default function LoadingSpinner() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="inline-flex flex-col items-center gap-3">
        <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-gray-800/90 to-gray-800/50 text-gray-300 shadow-lg backdrop-blur-sm border border-gray-700/30">
          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading 3D Scene...
        </span>
      </div>
    </div>
  );
}
