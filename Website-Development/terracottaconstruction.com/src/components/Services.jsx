import React from 'react';
import { Leaf, Hammer, Wrench, Home, AlertTriangle, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Landscaping & Lawn Care',
      description: 'Professional mowing, trimming, cleanup, mulching, and seasonal maintenance.',
      icon: <Leaf className="w-8 h-8 text-[#924C2E]" />,
    },
    {
      title: 'Fencing Installation & Repair',
      description: 'Wood, chain link, and metal fencing installed or repaired with precision.',
      icon: <Hammer className="w-8 h-8 text-[#924C2E]" />,
    },
    {
      title: 'Handyman Services & Repairs',
      description: 'General repairs, mounting, drywall, doors, caulking, and more.',
      icon: <Wrench className="w-8 h-8 text-[#924C2E]" />,
    },
    {
      title: 'Apartment Turnovers',
      description: 'Fast, thorough apartment maintenance and refreshes between tenants.',
      icon: <Home className="w-8 h-8 text-[#924C2E]" />,
    },
    {
      title: 'Emergency Services (24/7)',
      description: 'Rapid response for leaks, break-ins, power loss, and urgent repairs.',
      icon: <AlertTriangle className="w-8 h-8 text-[#924C2E]" />,
    },
    {
      title: 'Metal Buildings & Custom Projects',
      description: 'Custom steel building construction for sheds, workshops, and more.',
      icon: <Warehouse className="w-8 h-8 text-[#924C2E]" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8">
          Our Core Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-body text-gray-800">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded shadow hover:shadow-md transition text-left">
              <div className="mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-[#924C2E] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/services"
            className="inline-block bg-[#924C2E] text-white font-body px-6 py-3 rounded hover:bg-[#7a3f28] transition"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
