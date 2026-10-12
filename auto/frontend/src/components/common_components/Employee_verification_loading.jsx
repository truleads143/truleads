export default function LoadingOverlay({ text = "Authenticating..." }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
      
      {/* Spinner */}
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#124D95]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#124D95] border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-sm font-medium text-[#0d3768] tracking-wide">
        {text}
      </p>
    </div>
  );
}
