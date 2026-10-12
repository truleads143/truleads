export default function EmptyLeads() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
    <div className="w-full max-w-xl mx-auto mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
      
      {/* Icon */}
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#124D95]/10">
        <svg
          className="h-6 w-6 text-[#124D95]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m7-12H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8z"
          />
        </svg>
      </div>

      {/* Text */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        No Leads Found
      </h2>

      <p className="text-sm text-gray-600">
        There are currently no insurance leads available.
      </p>

    </div>
    </div>
  );
}
