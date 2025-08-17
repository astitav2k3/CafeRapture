import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative h-[70vh] md:h-[60vh] overflow-hidden">
      {/* Background with subtle zoom animation */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="container mx-auto px-6 text-left text-white">
          {/* Title */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
              Cafe Rapture
            </h1>
            <p className="mt-4 max-w-xl test-left text-lg">
              Where taste meets comfort.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-left gap-4 mb-8">
              <a
                href="#reserve"
                className="px-6 py-3 bg-orange-500 text-white rounded-2xl shadow-lg hover:bg-orange-600 transition"
              >
                Reserve Table
              </a>
              <a
                href="#menu"
                className="px-6 py-3 bg-gray-800 text-white rounded-2xl shadow-lg hover:bg-gray-900 transition"
              >
                View Menu
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-left space-x-6">
              <a href="https://www.instagram.com" className="hover:text-pink-400 transition">
                <Instagram size={28} />
              </a>
              <a href="https://www.facebook.com" className="hover:text-blue-400 transition">
                <Facebook size={28} />
              </a>
              <a href="https://www.x.com" className="hover:text-sky-400 transition">
                <Twitter size={28} />
              </a>
              <a   
               href="https://wa.me/+917009171767?text=Hi%20there!%20I%20would%20like%20to%20inquire%20about%20CafeRapture%20reservations.%20Could%20you%20help%20me%3F"
               className="hover:text-green-400 transition">
                <MessageCircle size={28} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
