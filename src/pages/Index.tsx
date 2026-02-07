import { useState, useRef, useEffect } from "react";

const Index = () => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
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
      // Calculate escape direction (opposite to cursor)
      const angle = Math.atan2(distanceY, distanceX);
      const escapeDistance = 80;
      
      let newX = noPosition.x - Math.cos(angle) * escapeDistance;
      let newY = noPosition.y - Math.sin(angle) * escapeDistance;

      // Keep button within container bounds
      const maxX = (containerRect.width - buttonRect.width) / 2 - 20;
      const maxY = 150;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      setNoPosition({ x: newX, y: newY });
    }
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#fce4ec" }}
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={containerRef}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-md w-full relative overflow-visible"
      >
        {!showSuccess ? (
          <>
            {/* Cute Cat with Heart */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  {/* Cat face */}
                  <ellipse cx="50" cy="55" rx="35" ry="30" fill="#e8b87d" />
                  {/* Left ear */}
                  <polygon points="20,35 30,55 15,55" fill="#e8b87d" />
                  <polygon points="22,38 28,50 18,50" fill="#f5d0a9" />
                  {/* Right ear */}
                  <polygon points="80,35 70,55 85,55" fill="#e8b87d" />
                  <polygon points="78,38 72,50 82,50" fill="#f5d0a9" />
                  {/* Eyes */}
                  <circle cx="38" cy="52" r="4" fill="#2d2d2d" />
                  <circle cx="62" cy="52" r="4" fill="#2d2d2d" />
                  {/* Nose */}
                  <ellipse cx="50" cy="62" rx="4" ry="3" fill="#f8a5a5" />
                  {/* Heart */}
                  <path 
                    d="M75,25 C80,15 95,15 95,30 C95,40 80,50 75,55 C70,50 55,40 55,30 C55,15 70,15 75,25" 
                    fill="#e91e63"
                  />
                </svg>
              </div>
            </div>

            {/* Question */}
            <h1 
              className="text-2xl md:text-3xl font-medium mb-8"
              style={{ color: "#333" }}
            >
              manshi will you be my valentine?
            </h1>

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
                className="px-6 py-2 text-gray-700 font-medium transition-all duration-200"
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
          <div className="py-8">
            {/* Success Hearts Animation */}
            <div className="text-6xl mb-6 animate-bounce">💕</div>
            <h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#e91e63" }}
            >
              Yay! 🎉
            </h1>
            <p className="text-xl text-gray-600">
              I knew you'd say yes, Manshi! ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
