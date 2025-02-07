const TimeUnit = ({ value, label }) => (
  <div className="bg-white/30 p-6 rounded-xl min-w-[140px] flex flex-col items-center 
    transform transition-all duration-300 hover:-translate-y-1 hover:scale-105
    border border-white/40 shadow-lg backdrop-blur-sm">
    <span className="text-4xl font-bold tabular-nums">
      {value.toString().padStart(2, '0')}
    </span>
    <div className="text-sm mt-2 font-medium text-white/90">{label}</div>
  </div>
);

export default TimeUnit; 