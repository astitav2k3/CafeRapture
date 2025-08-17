import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GALLERY = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
 ];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="py-12 container mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-6">Gallery</h2>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {GALLERY.map((src, idx) => (
          <motion.img
            key={idx}
            src={src}
            alt={`gallery-${idx}`}
            loading="lazy"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={() => setLightbox(src)}
            className="w-full mb-4 rounded-lg cursor-pointer object-cover shadow-md"
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="lightbox"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
