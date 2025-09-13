import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

type Photo = {
  id: number;
  title: string;
  description: string;
  url: string;
};

export default function Index() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.from("photos").select("*");
      if (error) {
        console.error("Error fetching photos:", error);
      } else {
        setPhotos(data || []);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  if (loading) return <p>Loading photos...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="border rounded-lg shadow-lg p-4 flex flex-col items-center"
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-lg font-semibold">{photo.title}</h2>
          <p className="text-gray-600">{photo.description}</p>
        </div>
      ))}
    </div>
  );
}
