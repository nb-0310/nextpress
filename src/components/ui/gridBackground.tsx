export default function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* Horizontal lines */}
        {[...Array(100)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="100%"
            y2={i * 50}
            stroke="rgba(255,255,255,0.1)" // Light gray lines
            strokeWidth="1"
          />
        ))}
        {/* Vertical lines */}
        {[...Array(100)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="100%"
            stroke="rgba(255,255,255,0.1)" // Light gray lines
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-black/25 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/25 to-[#0a0a0a]" />
    </div>
  )
}
