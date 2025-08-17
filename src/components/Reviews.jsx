import React from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  { id: 1, name: "Riya Sharma", text: "The aroma hits you before you even walk in — their cappuccino is a hug in a cup!", stars: 5 },
  { id: 2, name: "Arjun Mehta", text: "Best croissants in town, paired perfectly with a flat white. My new morning ritual.", stars: 5 },
  { id: 3, name: "Ananya Kapoor", text: "A cozy corner, a good book, and their mocha… pure bliss.", stars: 5 },
  { id: 4, name: "Vikram Singh", text: "Friendly staff and a relaxed vibe. The avocado toast is a must-try.", stars: 5 },
  { id: 5, name: "Sana Iqbal", text: "Great for remote work — fast WiFi and delicious cold brew.", stars: 5 }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-12 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-6">What people say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-200 flex items-center justify-center font-semibold text-amber-800">
                  {r.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-amber-500">
                    {"★".repeat(r.stars)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-slate-600">"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
