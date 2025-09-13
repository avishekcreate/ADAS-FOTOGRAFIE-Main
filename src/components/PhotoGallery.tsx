// replace the current gallery file with this - PhotoGallery.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client"; // same path as created above
import { PhotoCard } from "@/components/PhotoCard";
import { PhotoModal } from "@/components/PhotoModal";

type PhotoRow = {
  id: string;
  title: string | null;
  description: string | null;
  url?: string | null;
  file_url?: string | null;
  created_at?: string | null;
};

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PhotoRow | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        setPhotos([]);
      } else {
        setPhotos((data as PhotoRow[]) || []);
      }
      setLoading(false);
    }
    fetchPhotos();
  }, []);

  return (
    <>
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">Loading gallery…</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {photos.map((p) => {
                const imgUrl = (p as any).url || (p as any).file_url || "";
                return (
                  <div key={p.id}>
                    <PhotoCard
                      image={imgUrl}
                      title={p.title || ""}
                      description={p.description || ""}
                      animationClass=""
                      onClick={() => setSelected(p)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <PhotoModal
          isOpen={true}
          image={(selected as any).url || (selected as any).file_url || ""}
          title={selected.title || ""}
          description={selected.description || ""}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};

export default PhotoGallery;
