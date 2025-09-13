import { useState, useMemo } from 'react';
import { PhotoCard } from './PhotoCard';
import { PhotoModal } from './PhotoModal';

// Import only the images you have
import portrait1 from '@/assets/portrait-1.jpg';
import portrait2 from '@/assets/portrait-2.jpg';
import portrait3 from '@/assets/portrait-3.jpg';
import landscape1 from '@/assets/landscape-1.jpg';
import landscape2 from '@/assets/landscape-2.jpg';
import architecture1 from '@/assets/architecture-1.jpg';
import architecture2 from '@/assets/architecture-2.jpg';
import street1 from '@/assets/street-1.jpg';
import street2 from '@/assets/street-2.jpg';
import nature1 from '@/assets/nature-1.jpg';
import nature2 from '@/assets/nature-2.jpg';
import abstract1 from '@/assets/abstract-1.jpg';
import abstract2 from '@/assets/abstract-2.jpg';
import wildlife1 from '@/assets/wildlife-1.jpg';
import automotive1 from '@/assets/automotive-1.jpg';
import barbet1 from '@/assets/blue-throated-barbet.webp';
import waterfall1 from '@/assets/DSC01243.webp';

interface Photo {
  id: number;
  image: string;      // always required
  title: string;
  description: string;
  gridClass: string;
}

const photos: Photo[] = [
  {
    id: 1,
    image: portrait1,
    title: "Soulful",
    description: "A portrait that captures the depth.",
    gridClass: "md:col-span-1 md:row-span-2"
  },
  {
    id: 2,
    image: landscape1,
    title: "M",
    description: "The ntain peaks emerging from morning mist, a meditation on nature's quiet power.",
    gridClass: "md:col-span-2 md:row-span-1"
  },
  {
    id: 3,
    image: architecture1,
    title: "Urban ",
    description: "Abstract arch celebrate the intersection of human design and natural light.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    image: street1,
    title: "Cits",
    description: "Candid motic spirit of human connection in public spaces.",
    gridClass: "md:col-span-2 md:row-span-1"
  },
  {
    id: 5,
    image: nature1,
    title: "Morni",
    description: "Macro photoallest details and textures.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 6,
    image: abstract1,
    title: "Etherw",
    description: "Abstracy between photography and visual poetry.",
    gridClass: "md:col-span-1 md:row-span-2"
  },
  {
    id: 7,
    image: portrait2,
    title: "Windht",
    description: "Soft naturalhentic beauty and grace.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 8,
    image: landscape2,
    title: "Rollinlls",
    description: "Minimalist landscape photography showcasing the power of sipace.",
    gridClass: "md:col-span-2 md:row-span-1"
  },
  {
    id: 9,
    image: architecture2,
    title: "Concretems",
    description: "Brutalist architeposition and lighting.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 10,
    image: street2,
    title: "Rainies",
    description: "Urban poetry cay in everyday scenes.",
    gridClass: "md:col-span-1 md:row-span-2"
  },
  {
    id: 11,
    image: nature2,
    title: "Watge",
    description: "Macro expry found in morning dew.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 12,
    image: abstract2,
    title: "Smoe",
    description: "Abstof smoke and light interaction.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 13,
    image: wildlife1,
    title: "Freeght",
    description: "Wildlife f birds in their natural element.",
    gridClass: "md:col-span-1 md:row-span-2"
  },
  {
    id: 14,
    image: automotive1,
    title: "Classi",
    description: "Automotive p vintage automobiles.",
    gridClass: "md:col-span-2 md:row-span-1"
  },
  {
    id: 15,
    image: portrait3,
    title: "Weatherdom",
    description: "A portrait study explof age and the stories written in weathered hands.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 16,
    image: barbet1,  // ✅ webp only
    title: "Blue Throated Barbet",
    description: "Jewel of the forest, “kutru… kutru… kutru” call echoes through woodlands, making it easy to hear even when hidden among leaves.",
    gridClass: "md:col-span-1 md:row-span-1"
  },
  {
    id: 17,
    image: waterfall1,  // ✅ webp only
    title: "Pumling Waterfall",
    description: "Crystal-clear waters cascading down mossy rocks, a refreshing escape into nature's embrace.",
    gridClass: "md:col-span-1 md:row-span-1"
  }
];

export const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  // Create columns for clean layout
  const photoColumns = useMemo(() => {
    const columns = [[], [], [], []] as Photo[][];
    photos.forEach((photo, index) => {
      columns[index % 4].push(photo);
    });
    return columns;
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleModalClose = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {photoColumns.map((column, columnIndex) => (
              <div key={columnIndex} className={`space-y-6 animate-vertical-float-${columnIndex + 1}`}>
                {column.map((photo) => (
                  <div key={photo.id}>
                    <PhotoCard
                      image={photo.image}   // 👈 just pass one image (jpg or webp)
                      title={photo.title}
                      description={photo.description}
                      animationClass=""
                      onClick={() => handlePhotoClick(photo)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <PhotoModal
        isOpen={!!selectedPhoto}
        onClose={handleModalClose}
        image={selectedPhoto?.image || ''}
        title={selectedPhoto?.title || ''}
        description={selectedPhoto?.description || ''}
      />
    </>
  );
};
