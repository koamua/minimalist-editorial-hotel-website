"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, useInView } from "framer-motion";
import { Hotel } from "lucide-react";

export default function Contact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [roomPrice, setRoomPrice] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    message: "",
  });

  useEffect(() => {
    // Get room info from URL params
    const room = searchParams.get("room");
    const price = searchParams.get("price");
    if (room) {
      setSelectedRoom(room);
      setRoomPrice(price);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create URL params from form data
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      message: formData.message,
    });

    // Add room info if selected
    if (selectedRoom) {
      params.append("room", selectedRoom);
    }
    if (roomPrice) {
      params.append("price", roomPrice);
    }
    
    // Navigate to confirmation page
    router.push(`/booking-confirmation?${params.toString()}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="bg-white py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <motion.div 
          className="mb-16 text-center"
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
          <h2 className="mb-6">Book Your Stay</h2>
          <p className="text-lg">
            Complete the form below and our team will be in touch to confirm your reservation
          </p>
        </motion.div>

        {/* Selected Room Display */}
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-sm bg-beige p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900">
                <Hotel className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm uppercase tracking-wider text-neutral-600">Selected Room</p>
                <p className="text-xl font-medium text-neutral-900">{selectedRoom}</p>
              </div>
              {roomPrice && (
                <div className="text-right">
                  <p className="text-sm text-neutral-600">From</p>
                  <p className="text-2xl font-semibold text-neutral-900">{roomPrice}</p>
                  <p className="text-xs text-neutral-600">per night</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Booking Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Personal Information */}
          <motion.div className="grid gap-6 md:grid-cols-2" variants={itemVariants}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm uppercase tracking-wider text-neutral-900">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="border-neutral-300 bg-neutral-50 focus:border-neutral-900"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm uppercase tracking-wider text-neutral-900">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-neutral-300 bg-neutral-50 focus:border-neutral-900"
                placeholder="john@example.com"
              />
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="phone" className="text-sm uppercase tracking-wider text-neutral-900">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="border-neutral-300 bg-neutral-50 focus:border-neutral-900"
              placeholder="+1 (555) 000-0000"
            />
          </motion.div>

          {/* Booking Details */}
          <motion.div className="grid gap-6 md:grid-cols-3" variants={itemVariants}>
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="text-sm uppercase tracking-wider text-neutral-900">
                Check-In *
              </Label>
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                required
                value={formData.checkIn}
                onChange={handleChange}
                className="border-neutral-300 bg-neutral-50 focus:border-neutral-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut" className="text-sm uppercase tracking-wider text-neutral-900">
                Check-Out *
              </Label>
              <Input
                id="checkOut"
                name="checkOut"
                type="date"
                required
                value={formData.checkOut}
                onChange={handleChange}
                className="border-neutral-300 bg-neutral-50 focus:border-neutral-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="text-sm uppercase tracking-wider text-neutral-900">
                Guests *
              </Label>
              <select
                id="guests"
                name="guests"
                required
                value={formData.guests}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
            </div>
          </motion.div>

          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="message" className="text-sm uppercase tracking-wider text-neutral-900">
              Special Requests
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="border-neutral-300 bg-neutral-50 focus:border-neutral-900"
              placeholder="Any special requirements or preferences..."
            />
          </motion.div>

          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button type="submit" className="btn-primary px-16">
                Submit Booking
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}