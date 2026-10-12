import { useNavigate } from "react-router-dom";

export default function ErrorDisplay({ error }) {
  const navigate = useNavigate();

  // Normalize error (string | array | unknown)
  const messages = Array.isArray(error)
    ? error
    : error
    ? [error]
    : ["Something went wrong. Please try again."];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0d3768] via-[#124D95] to-[#0d3768] px-4">
      
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-center">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-7 w-7 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-serif font-semibold text-[#0d3768] mb-2">
          Unable to Continue
        </h2>

        {/* Errors */}
        <ul className="mb-6 space-y-1 text-sm text-red-600">
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>

        {/* Login Button */}
        <button
          onClick={() => navigate("/employee/login")}
          className="
            w-full py-3 rounded-xl
            bg-[#124D95] text-white
            font-semibold text-lg
            hover:bg-[#0d3768]
            transition-all duration-300
          "
        >
          Go to Login
        </button>

      </div>
    </div>
  );
}
