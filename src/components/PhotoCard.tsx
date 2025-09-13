import React from "react";

type PhotoCardProps = {
  image: string;
  title: string;
  description: string;
  animationClass?: string;
  onClick: () => void;
};

export const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  title,
  description,
  animationClass = "",
  onClick,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-xl transition ${animationClass}`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
