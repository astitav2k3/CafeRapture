import React from "react";

export default function About() {
  return (
    <section className="py-12 container mx-auto px-6">
      <div className="md:flex md:items-center md:gap-8">
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-600 mb-4">
            We serve freshly brewed coffee, artisan meals, and delightful desserts in a cozy atmosphere.
          </p>
          <p className="text-slate-600">
            We roast small batches, design seasonal menus, and host friendly gatherings.  
            Stop by for a cup and stay for the vibe.
          </p>
        </div>

        {/* Image Section */}
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
          alt="about"
          className="mt-6 md:mt-0 md:w-1/2 rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
