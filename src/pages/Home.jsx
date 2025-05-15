import React from 'react';
import { Link } from 'react-router-dom';
import metalBuilding from '../assets/metal_building.jpg';
import WhyChoose from '../components/WhyChoose';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <section
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${metalBuilding})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-heading font-bold mb-4">
            Terracotta Construction
          </h1>
          <p className="text-lg font-body mb-6">
            Reliable. Professional. Local.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#924C2E] font-body font-medium px-6 py-3 rounded shadow hover:bg-gray-100 transition"
          >
            Request a Free Estimate
          </Link>
        </div>
      </section>

        <WhyChoose />

      {/* About Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
            Built on Trust and Hard Work
          </h2>
          <p className="text-gray-700 font-body text-base">
            Terracotta Construction proudly serves Montgomery, Texas and surrounding areas with expert
            craftsmanship in fencing, landscaping, apartment maintenance, and more. We handle it all —
            from handyman projects to emergency services — with honesty, speed, and skill.
          </p>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-6 text-center">
            Our Core Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Landscaping & Lawn Care',
              'Fencing Installation & Repair',
              'Handyman & Repairs',
              'Apartment Turnovers',
              'Emergency Services',
              'Metal Buildings & Custom Projects',
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded shadow text-center text-gray-800 font-body"
              >
                {service}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-block bg-[#924C2E] text-white font-body px-6 py-3 rounded hover:bg-[#7a3f28] transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage