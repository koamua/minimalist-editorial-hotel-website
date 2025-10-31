"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Calendar, Users, Mail, Phone, Home, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectedRoom {
  name: string;
  price: string;
}

export default function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Get booking data from URL params
    const roomsParam = searchParams.get("rooms");
    let rooms: SelectedRoom[] = [];
    
    // Parse rooms if available
    if (roomsParam) {
      try {
        rooms = JSON.parse(roomsParam);
      } catch (e) {
        console.error("Failed to parse rooms:", e);
      }
    }

    const data = {
      name: searchParams.get("name"),
      email: searchParams.get("email"),
      phone: searchParams.get("phone"),
      checkIn: searchParams.get("checkIn"),
      checkOut: searchParams.get("checkOut"),
      guests: searchParams.get("guests"),
      message: searchParams.get("message"),
      rooms: rooms,
    };

    if (!data.name || !data.email) {
      // If no booking data, redirect to home
      router.push("/");
    } else {
      setBookingData(data);
    }
  }, [searchParams, router]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!bookingData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-beige">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-900">
            <Check className="h-12 w-12 text-white" strokeWidth={3} />
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-neutral-900">Booking Request Received</h1>
          <p className="text-xl text-neutral-800">
            Thank you for choosing Serenity. We&apos;ve received your booking request and will confirm your
            reservation shortly.
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 rounded-sm bg-white p-8 shadow-sm md:p-12"
        >
          <h3 className="mb-8 text-center text-neutral-900">Your Booking Details</h3>

          <div className="space-y-6">
            {/* Room Information - Show all selected rooms */}
            {bookingData.rooms && bookingData.rooms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-b border-neutral-200 pb-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                    <Hotel className="h-5 w-5 text-neutral-900" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-neutral-600">
                      Selected Room{bookingData.rooms.length > 1 ? "s" : ""}
                    </p>
                    <p className="text-lg font-medium text-neutral-900">
                      {bookingData.rooms.length} {bookingData.rooms.length === 1 ? "Room" : "Rooms"}
                    </p>
                  </div>
                </div>
                
                <div className="ml-0 space-y-3 md:ml-13">
                  {bookingData.rooms.map((room: SelectedRoom, index: number) => (
                    <motion.div
                      key={`${room.name}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between rounded-sm bg-neutral-50 p-4"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-wider text-neutral-600">Room {index + 1}</p>
                        <p className="text-lg font-medium text-neutral-900">{room.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-600">From</p>
                        <p className="text-xl font-semibold text-neutral-900">{room.price}</p>
                        <p className="text-xs text-neutral-600">per night</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Guest Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-start gap-4 border-b border-neutral-200 pb-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                <Mail className="h-5 w-5 text-neutral-900" />
              </div>
              <div className="flex-1">
                <p className="mb-1 text-sm uppercase tracking-wider text-neutral-600">Guest Name</p>
                <p className="text-lg font-medium text-neutral-900">{bookingData.name}</p>
                <p className="mt-1 text-neutral-700">{bookingData.email}</p>
                {bookingData.phone && <p className="text-neutral-700">{bookingData.phone}</p>}
              </div>
            </motion.div>

            {/* Check-in & Check-out */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-start gap-4 border-b border-neutral-200 pb-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                <Calendar className="h-5 w-5 text-neutral-900" />
              </div>
              <div className="flex-1">
                <p className="mb-2 text-sm uppercase tracking-wider text-neutral-600">Stay Duration</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Check-in</p>
                    <p className="text-neutral-900">{formatDate(bookingData.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Check-out</p>
                    <p className="text-neutral-900">{formatDate(bookingData.checkOut)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Guests */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex items-start gap-4 border-b border-neutral-200 pb-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                <Users className="h-5 w-5 text-neutral-900" />
              </div>
              <div className="flex-1">
                <p className="mb-1 text-sm uppercase tracking-wider text-neutral-600">Number of Guests</p>
                <p className="text-lg font-medium text-neutral-900">
                  {bookingData.guests} {parseInt(bookingData.guests) === 1 ? "Guest" : "Guests"}
                </p>
              </div>
            </motion.div>

            {/* Special Requests */}
            {bookingData.message && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-beige">
                  <Phone className="h-5 w-5 text-neutral-900" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-sm uppercase tracking-wider text-neutral-600">Special Requests</p>
                  <p className="text-neutral-900">{bookingData.message}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-12 rounded-sm bg-white p-8 shadow-sm"
        >
          <h4 className="mb-6 text-center text-neutral-900">What Happens Next?</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
                1
              </div>
              <p className="pt-1 text-neutral-800">
                Our team will review your booking request within the next 24 hours
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
                2
              </div>
              <p className="pt-1 text-neutral-800">
                You&apos;ll receive a confirmation email with your reservation details and payment instructions
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
                3
              </div>
              <p className="pt-1 text-neutral-800">
                If you have any questions, our concierge team is available 24/7
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={() => router.push("/")} className="btn-primary gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </motion.div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-12 text-center"
        >
          <p className="mb-2 text-sm uppercase tracking-wider text-neutral-600">Need Assistance?</p>
          <p className="text-neutral-900">
            Contact us at{" "}
            <a href="tel:+15551234567" className="font-medium hover:underline">
              +1 (555) 123-4567
            </a>{" "}
            or{" "}
            <a href="mailto:reservations@serenityhotel.com" className="font-medium hover:underline">
              reservations@serenityhotel.com
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}