import React, { useState } from "react";

interface RatingProps {
  onChange: (score: number) => void;
}

const RatingInput: React.FC<RatingProps> = ({ onChange }) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number>(0);

  const handleStarClick = (clickedScore: number) => {
    setSelectedScore(clickedScore);
    onChange(clickedScore);
  };

  const handleStarHover = (hoveredScore: number) => {
    setHoverScore(hoveredScore);
  };

  const handleMouseLeave = () => {
    setHoverScore(null);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="flex items-center space-x-1"
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverScore ?? selectedScore);

        return (
          <svg
            key={index}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            className={`h-5 w-5 cursor-pointer ${
              isFilled ? "text-yellow-500" : "text-gray-300"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        );
      })}
    </div>
  );
};

export default RatingInput;
