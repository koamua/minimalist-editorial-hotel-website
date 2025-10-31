"use client";

import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 py-16 text-neutral-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3
              className="mb-4 text-2xl font-light tracking-wider text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SERENITY
            </h3>
            <p className="text-sm leading-relaxed">
              Where elegance meets tranquility. Experience luxury redefined in our carefully
              curated spaces designed for the discerning traveler.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
                <p className="text-sm">
                  123 Serenity Boulevard
                  <br />
                  Coastal District, CA 90210
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-sm hover:text-white">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@serenityhotel.com" className="text-sm hover:text-white">
                  info@serenityhotel.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-white hover:bg-white hover:text-neutral-900"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-white hover:bg-white hover:text-neutral-900"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-white hover:bg-white hover:text-neutral-900"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-xs text-neutral-500">
              © {new Date().getFullYear()} Serenity Hotel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
