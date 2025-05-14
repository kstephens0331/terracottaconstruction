import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/metal_building.jpg'; // or another image

const Hero = () => {
  return (
    <section
      className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Built Right. Every Time.
        </h1>
        <p className="text-lg md:text-xl font-body mb-6">
          Full-service construction, repairs, landscaping, and maintenance across Montgomery County.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-[#924C2E] font-body font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Request a Free Estimate
        </Link>
      </div>
    </section>
  );
};

export default Hero;