import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    async function loadPhotos() {
      let { data, error } = await supabase
        .from("photos")
        .select("id, title, description, image_url");

      if (error) {
        console.error("Error loading photos:", error);
      } else {
        setPhotos(data || []);
      }
    }

    loadPhotos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <div key={photo.id} className="rounded shadow p-2">
          <img src={photo.image_url} alt={photo.title} className="rounded" />
          <h3 className="font-bold mt-2">{photo.title}</h3>
          <p className="text-sm">{photo.description}</p>
        </div>
      ))}
    </div>
  );
}
