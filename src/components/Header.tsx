"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-sm backdrop-blur-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`text-2xl font-light tracking-wider transition-colors ${
              isScrolled ? "text-neutral-900" : "text-white"
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SERENITY
          </button>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden items-center gap-12 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            className={`text-sm uppercase tracking-wider transition-colors hover:text-neutral-900 ${
              isScrolled ? "text-neutral-600" : "text-white/90"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            About
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("rooms")}
            className={`text-sm uppercase tracking-wider transition-colors hover:text-neutral-900 ${
              isScrolled ? "text-neutral-600" : "text-white/90"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Rooms
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("gallery")}
            className={`text-sm uppercase tracking-wider transition-colors hover:text-neutral-900 ${
              isScrolled ? "text-neutral-600" : "text-white/90"
            }`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            Gallery
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("contact")}
            className={`rounded-sm border px-6 py-2 text-sm uppercase tracking-wider transition-all ${
              isScrolled
                ? "border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
                : "border-white text-white hover:bg-white hover:text-neutral-900"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Book Now
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden ${isScrolled ? "text-neutral-900" : "text-white"}`}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="bg-white px-6 pb-6 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col gap-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {["about", "rooms", "gallery"].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left text-sm uppercase tracking-wider text-neutral-600 hover:text-neutral-900"
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="rounded-sm border border-neutral-900 px-6 py-2 text-center text-sm uppercase tracking-wider text-neutral-900 hover:bg-neutral-900 hover:text-white"
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -20 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}