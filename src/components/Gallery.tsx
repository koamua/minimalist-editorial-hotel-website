"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2340&auto=format&fit=crop",
    alt: "Hotel bedroom",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2340&auto=format&fit=crop",
    alt: "Hotel bathroom",
  },
  {
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2340&auto=format&fit=crop",
    alt: "Hotel restaurant",
  },
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2340&auto=format&fit=crop",
    alt: "Hotel lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2340&auto=format&fit=crop",
    alt: "Hotel spa",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2340&auto=format&fit=crop",
    alt: "Hotel gym",
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="gallery" className="bg-beige py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mx-auto mb-20 max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="editorial-line mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <h2 className="mb-6">Gallery</h2>
          <p className="text-lg">
            A glimpse into the refined spaces and moments that await you
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative h-[400px] overflow-hidden bg-neutral-200"
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <motion.div 
                className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}