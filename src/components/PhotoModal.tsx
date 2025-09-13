import React from "react";

type PhotoModalProps = {
  isOpen: boolean;
  image: string;
  title: string;
  description: string;
  onClose: () => void;
};

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  image,
  title,
  description,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full mx-4 overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full max-h-[70vh] object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black text-white rounded-full px-3 py-1 hover:bg-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <h2 className="font-bold text-2xl mb-2">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};
