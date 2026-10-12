export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768]">
      <div className="flex flex-col items-center gap-4 text-white">
        
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm sm:text-base tracking-wide text-white/80">
          Verifying your location…
        </p>

      </div>
    </div>
  );
}
