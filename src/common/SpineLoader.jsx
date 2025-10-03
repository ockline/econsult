import React from 'react';

const SpinnerWithImage = ({
  imageSrc = "/assets/images/socrate.png",
  size = 100,
}) => {
  const ringSize = size;
  const imageSize = size / 2;

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-[#fff] shadow-md"
      style={{ width: ringSize, height: ringSize }}
    >
      {/* Spinning ring */}
      <svg
        className="absolute animate-spin text-blue-500"
        viewBox="0 0 24 24"
        style={{ width: ringSize, height: ringSize }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>

      {/* Center image */}
      <img
        src={imageSrc}
        alt="Spinner Center"
        className="z-10 object-contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </div>
  );
};

export default SpinnerWithImage;
