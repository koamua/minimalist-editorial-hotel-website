"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2340&auto=format&fit=crop"
          alt="Luxury hotel exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content with animations */}
      <motion.div 
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white"
        style={{ opacity }}
      >
        <motion.div 
          className="editorial-line mb-8 bg-white/60"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.h1 
          className="mb-6 max-w-4xl text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Where Elegance Meets Tranquility
        </motion.h1>
        <motion.p 
          className="mb-12 max-w-2xl text-lg text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience luxury redefined in our carefully curated spaces designed for the discerning traveler
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={scrollToContact}
            className="btn-primary hover:bg-white hover:text-neutral-900"
          >
            Book Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}