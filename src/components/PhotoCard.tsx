import { useState } from 'react';

interface PhotoCardProps {
  image: string;
  webp?: string;
  title: string;
  description: string;
  animationClass?: string;
  onClick: () => void;
}

export const PhotoCard = ({ image, webp, title, description, animationClass = '', onClick }: PhotoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`photo-card group cursor-pointer ${animationClass} ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500`}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-surface-secondary">
        {webp ? (
          <picture>
            <source srcSet={webp} type="image/webp" />
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 ease-out"
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </picture>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        )}

        {/* Hover overlay */}
        <div className="photo-overlay">
          <div className="text-white">
            <h3 className="text-title text-white mb-2 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
              {title}
            </h3>
            <p className="text-body text-white/90 transform translate-y-4 transition-transform duration-300 delay-75 group-hover:translate-y-0">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
