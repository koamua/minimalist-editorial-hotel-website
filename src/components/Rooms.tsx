"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const rooms = [
  {
    name: "Deluxe Suite",
    price: "$320",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2340&auto=format&fit=crop",
    amenities: ["King Bed", "City View", "45 m²", "Rain Shower", "Mini Bar"],
  },
  {
    name: "Executive Room",
    price: "$450",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2340&auto=format&fit=crop",
    amenities: ["King Bed", "Ocean View", "60 m²", "Bathtub", "Private Balcony"],
  },
  {
    name: "Presidential Suite",
    price: "$850",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2340&auto=format&fit=crop",
    amenities: ["King Bed", "Panoramic View", "120 m²", "Spa Bath", "Living Room"],
  },
];

export default function Rooms() {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleReserve = (roomName: string, roomPrice: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      // Scroll to contact form and pass room info via URL
      router.push(`/?room=${encodeURIComponent(roomName)}&price=${encodeURIComponent(roomPrice)}#contact`);
      // Also dispatch a custom event so the Contact component updates immediately
      try {
        window.dispatchEvent(
          new CustomEvent("roomSelected", {
            detail: { name: roomName, price: roomPrice },
          }),
        );
      } catch (e) {
        // ignore in non-browser environments
      }
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="rooms" className="bg-white py-24 md:py-32" ref={ref}>
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
          <h2 className="mb-6">Our Rooms</h2>
          <p className="text-lg">
            Each room is a sanctuary of comfort, designed with meticulous attention to detail 
            and appointed with the finest amenities.
          </p>
        </motion.div>

        {/* Room Cards */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room.name}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group overflow-hidden border-neutral-200 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                {/* Room Image */}
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Room Details */}
                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-2xl">{room.name}</h3>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="text-xl font-semibold text-neutral-900">{room.price}</p>
                      <p className="text-xs text-muted-foreground">per night</p>
                    </div>
                  </div>

                  <div className="editorial-line mb-6" />

                  {/* Amenities */}
                  <motion.ul 
                    className="mb-6 space-y-2"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.3 + index * 0.2,
                        },
                      },
                    }}
                  >
                    {room.amenities.map((amenity) => (
                      <motion.li 
                        key={amenity} 
                        className="flex items-center text-sm text-muted-foreground"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <Check className="mr-2 h-4 w-4 text-neutral-900" />
                        {amenity}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleReserve(room.name, room.price)}
                      className="btn-secondary w-full"
                    >
                      Reserve
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}