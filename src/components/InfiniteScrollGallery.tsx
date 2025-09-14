import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PhotoCard } from "@/components/PhotoCard";
import { PhotoModal } from "@/components/PhotoModal";

interface Photo {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const InfiniteScrollGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Fetch photos from Supabase
  const fetchPhotos = useCallback(async (page: number) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("photos")
      .select("id, title, description, file_url")
      .order("created_at", { ascending: false })
      .range(page * 12, page * 12 + 11); // 12 items per page

    if (error) {
      console.error("Error fetching photos from Supabase:", error);
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setHasMore(false);
    } else {
      const newPhotos: Photo[] = data.map((p) => ({
        id: p.id,
        image: p.file_url,
        title: p.title || "Untitled",
        description: p.description || "No description",
      }));

      setPhotos((prev) => [...prev, ...newPhotos]);
    }

    setLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    fetchPhotos(0);
  }, [fetchPhotos]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Load more when page increases
  useEffect(() => {
    if (page > 0) {
      fetchPhotos(page);
    }
  }, [page, fetchPhotos]);

  return (
    <>
      <section className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id}>
                <PhotoCard
                  image={photo.image}
                  title={photo.title}
                  description={photo.description}
                  animationClass=""
                  onClick={() => setSelectedPhoto(photo)}
                />
              </div>
            ))}
          </div>
          {loading && (
            <div className="text-center py-4 text-gray-500">
              Loading more photos…
            </div>
          )}
          {!hasMore && (
            <div className="text-center py-4 text-gray-400">
              No more photos to load.
            </div>
          )}
        </div>
      </section>

      {selectedPhoto && (
        <PhotoModal
          isOpen={true}
          onClose={() => setSelectedPhoto(null)}
          image={selectedPhoto.image}
          title={selectedPhoto.title}
          description={selectedPhoto.description}
        />
      )}
    </>
  );
};

export default InfiniteScrollGallery;
