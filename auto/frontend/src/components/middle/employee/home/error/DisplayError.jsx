export default function HomeError({ error }) {
  // Extract the most meaningful message safely
  const message =
    error?.response?.data?.message ||
    (Array.isArray(error?.response?.data?.errors)
      ? error.response.data.errors.join(", ")
      : error?.message) ||
    "Something went wrong. Please try again.";

  return (
    <div className="h-[80vh] flex items-center justify-center">
    <div className="w-full max-w-xl mx-auto mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm">
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-red-700 mb-2">
        Error
      </h2>

      {/* Message */}
      <p className="text-sm text-red-600 leading-relaxed">
        {message}
      </p>

    </div>
    </div>
  );
}
