import React from "react";

interface RatingProps {
  score: number;
}

const Rating: React.FC<RatingProps> = ({ score }) => {
  const filledStars = Math.floor(score);
  const hasHalfStar = score % 1 !== 0;
  const emptyStars = 5 - Math.ceil(score);

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <svg
          key={`filled-${index}`}
          className="h-5 w-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className="h-5 w-5 fill-current text-yellow-500"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="url(#half-gradient)"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={`empty-${index}`}
          className="h-5 w-5 fill-current text-gray-300"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
