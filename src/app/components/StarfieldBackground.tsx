export function StarfieldBackground() {
  // Generate random stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.2,
    delay: Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
      
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-primary/40 animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Constellation lines (subtle connecting lines) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" className="text-primary" />
            <stop offset="100%" stopColor="currentColor" className="text-secondary" />
          </linearGradient>
        </defs>
        
        {/* Example constellation lines */}
        <line x1="10%" y1="20%" x2="25%" y2="15%" stroke="url(#constellation-gradient)" strokeWidth="1" />
        <line x1="25%" y1="15%" x2="35%" y2="30%" stroke="url(#constellation-gradient)" strokeWidth="1" />
        <line x1="35%" y1="30%" x2="45%" y2="25%" stroke="url(#constellation-gradient)" strokeWidth="1" />
        
        <line x1="60%" y1="40%" x2="75%" y2="35%" stroke="url(#constellation-gradient)" strokeWidth="1" />
        <line x1="75%" y1="35%" x2="85%" y2="50%" stroke="url(#constellation-gradient)" strokeWidth="1" />
        
        <line x1="15%" y1="70%" x2="30%" y2="80%" stroke="url(#constellation-gradient)" strokeWidth="1" />
        <line x1="30%" y1="80%" x2="20%" y2="90%" stroke="url(#constellation-gradient)" strokeWidth="1" />
      </svg>
    </div>
  );
}
