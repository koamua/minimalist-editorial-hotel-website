"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="bg-beige py-24 md:py-32" ref={ref}>
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
          <motion.h2 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Nestled in the heart of serenity, our hotel stands as a testament to timeless elegance. 
            Each corner tells a story of craftsmanship, comfort, and curated experiences designed 
            to transport you beyond the ordinary.
          </motion.p>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Large Image */}
          <motion.div 
            className="relative h-[400px] overflow-hidden md:col-span-2 lg:row-span-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2340&auto=format&fit=crop"
              alt="Hotel lobby interior"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Small Images */}
          <motion.div 
            className="relative h-[400px] overflow-hidden lg:h-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2340&auto=format&fit=crop"
              alt="Hotel dining area"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          <motion.div 
            className="relative h-[400px] overflow-hidden lg:h-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2340&auto=format&fit=crop"
              alt="Hotel pool area"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          <motion.div 
            className="relative h-[400px] overflow-hidden md:col-span-2 lg:col-span-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2340&auto=format&fit=crop"
              alt="Hotel garden"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Feature Text */}
        <motion.div 
          className="mt-20 grid gap-12 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <h4 className="mb-4">Curated Design</h4>
            <p>
              Every element is thoughtfully selected to create an atmosphere of refined sophistication
            </p>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <h4 className="mb-4">Exceptional Service</h4>
            <p>
              Our dedicated team ensures your stay is nothing short of extraordinary
            </p>
          </motion.div>
          <motion.div className="text-center" variants={itemVariants}>
            <h4 className="mb-4">Prime Location</h4>
            <p>
              Situated in an idyllic setting, offering both tranquility and accessibility
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}