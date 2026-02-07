import { useState, useRef } from "react";

const Index = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const escapeRadius = 100;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!noButtonRef.current || !containerRef.current || showSuccess) return;

    const button = noButtonRef.current;
    const container = containerRef.current;
    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < escapeRadius) {
      const angle = Math.atan2(distanceY, distanceX);
      const escapeDistance = 80;
      
      let newX = noPosition.x - Math.cos(angle) * escapeDistance;
      let newY = noPosition.y - Math.sin(angle) * escapeDistance;

      const maxX = (containerRect.width - buttonRect.width) / 2 - 30;
      const maxY = 40;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      setNoPosition({ x: newX, y: newY });
    }
  };

  const handleMouseLeave = () => {
    if (!showSuccess) {
      setNoPosition({ x: 0, y: 0 });
    }
  };

  const handleYesClick = () => {
    setShowSuccess(true);
    // Generate celebration hearts
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setHearts(newHearts);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{ backgroundColor: "#fce4ec" }}
    >
      {/* Celebration hearts */}
      {showSuccess && hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-2xl animate-float-up pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {['💕', '❤️', '💖', '💗', '💓'][heart.id % 5]}
        </div>
      ))}
      
      <div 
        ref={containerRef}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-md w-full relative overflow-visible z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {!showSuccess ? (
          <>
            {/* Cute Cat with Heart */}
            <div className="mb-8 flex justify-center animate-bounce-gentle">
              <div className="relative">
                <svg width="160" height="160" viewBox="0 0 100 100">
                  {/* Cat face */}
                  <ellipse cx="50" cy="55" rx="35" ry="30" fill="#f5c890" />
                  {/* Left ear */}
                  <polygon points="18,30 32,55 12,52" fill="#f5c890" />
                  <polygon points="20,34 28,48 16,46" fill="#ffb6c1" />
                  {/* Right ear */}
                  <polygon points="82,30 68,55 88,52" fill="#f5c890" />
                  <polygon points="80,34 72,48 84,46" fill="#ffb6c1" />
                  {/* Blush cheeks */}
                  <ellipse cx="28" cy="60" rx="8" ry="5" fill="#ffb6c1" opacity="0.6" />
                  <ellipse cx="72" cy="60" rx="8" ry="5" fill="#ffb6c1" opacity="0.6" />
                  {/* Eyes - bigger and cuter */}
                  <ellipse cx="38" cy="50" rx="6" ry="7" fill="#2d2d2d" />
                  <ellipse cx="62" cy="50" rx="6" ry="7" fill="#2d2d2d" />
                  {/* Eye shine */}
                  <circle cx="40" cy="48" r="2" fill="white" />
                  <circle cx="64" cy="48" r="2" fill="white" />
                  {/* Cute nose */}
                  <ellipse cx="50" cy="60" rx="4" ry="3" fill="#ff8fa3" />
                  {/* Mouth */}
                  <path d="M46,65 Q50,70 54,65" stroke="#2d2d2d" strokeWidth="1.5" fill="none" />
                  {/* Whiskers */}
                  <line x1="20" y1="58" x2="32" y2="60" stroke="#d4a574" strokeWidth="1" />
                  <line x1="20" y1="64" x2="32" y2="64" stroke="#d4a574" strokeWidth="1" />
                  <line x1="80" y1="58" x2="68" y2="60" stroke="#d4a574" strokeWidth="1" />
                  <line x1="80" y1="64" x2="68" y2="64" stroke="#d4a574" strokeWidth="1" />
                  {/* Heart - bigger and positioned nicely */}
                  <path 
                    d="M78,20 C84,8 100,8 100,25 C100,38 82,52 78,58 C74,52 56,38 56,25 C56,8 72,8 78,20" 
                    fill="#e91e63"
                  />
                  {/* Heart shine */}
                  <ellipse cx="70" cy="22" rx="4" ry="3" fill="#ff6b9d" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h1 
                className="text-3xl md:text-4xl font-serif italic mb-2"
                style={{ 
                  color: "#e91e63",
                  fontFamily: "'Georgia', serif",
                  textShadow: "1px 1px 2px rgba(233, 30, 99, 0.2)"
                }}
              >
                Manshi,
              </h1>
              <p 
                className="text-xl md:text-2xl font-medium"
                style={{ color: "#555" }}
              >
                will you be my <span className="text-2xl md:text-3xl font-bold" style={{ color: "#e91e63" }}>Valentine</span>? 💕
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 min-h-[120px]">
              <button
                onClick={handleYesClick}
                className="px-8 py-3 rounded-full text-white font-semibold text-lg transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#e91e63" }}
              >
                Yes
              </button>
              
              <button
                ref={noButtonRef}
                className="px-6 py-2 rounded-full font-medium transition-all duration-200 border-2 border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400 hover:bg-gray-200"
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }}
              >
                No
              </button>
            </div>

            {/* Hint text */}
            <p className="mt-6 text-gray-500 text-sm">
              "No" seems a bit shy 🐱
            </p>
          </>
        ) : (
          <div className="py-6 relative">
            {/* Animated hearts ring */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 animate-spin-slow">
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-50px) translateX(-50%)`,
                    }}
                  >
                    💗
                  </span>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl animate-pulse">💕</span>
              </div>
            </div>

            {/* Main celebration text */}
            <h1 
              className="text-4xl md:text-5xl font-bold mb-3 animate-scale-in"
              style={{ 
                color: "#e91e63",
                fontFamily: "'Georgia', serif",
                textShadow: "2px 2px 4px rgba(233, 30, 99, 0.3)"
              }}
            >
              Yay! 🎉
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-4 font-medium animate-fade-in"
              style={{ color: "#555", animationDelay: "0.3s" }}
            >
              I knew you'd say yes!
            </p>

            {/* Special message */}
            <div 
              className="mt-6 p-4 rounded-2xl animate-fade-in"
              style={{ 
                backgroundColor: "#fff5f7",
                border: "2px dashed #ffb6c1",
                animationDelay: "0.6s"
              }}
            >
              <p 
                className="text-lg md:text-xl italic font-serif"
                style={{ color: "#e91e63" }}
              >
                "You make my heart skip a beat, Manshi 💖"
              </p>
            </div>

            {/* Decorative sparkles */}
            <div className="absolute top-0 left-4 text-xl animate-twinkle">✨</div>
            <div className="absolute top-8 right-4 text-xl animate-twinkle" style={{ animationDelay: "0.5s" }}>✨</div>
            <div className="absolute bottom-8 left-8 text-xl animate-twinkle" style={{ animationDelay: "1s" }}>✨</div>
            <div className="absolute bottom-4 right-8 text-xl animate-twinkle" style={{ animationDelay: "0.3s" }}>✨</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
