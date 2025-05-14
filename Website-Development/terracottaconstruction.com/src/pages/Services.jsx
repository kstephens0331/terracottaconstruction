import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Leaf, Hammer, Home, AlertTriangle, Warehouse } from 'lucide-react';
import Footer from '../components/Footer';

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

function ServicesPage() {
  return (
    <>
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-[#924C2E] mb-4">Our Services</h1>
          <p className="text-base text-gray-700 font-body mb-10 max-w-2xl mx-auto">
            We offer dependable, skilled construction and maintenance support throughout Montgomery County and beyond. Here's a quick look at how we serve.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-body text-gray-800">
            {services.map((service, i) => (
              <div key={i} className="bg-gray-50 rounded-md p-6 shadow hover:shadow-md transition text-left">
                <div className="mb-3">{service.icon}</div>
                <h3 className="font-semibold text-lg text-[#924C2E] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 bg-[#924C2E] text-white py-8 px-6 rounded-md shadow-lg">
            <h2 className="text-2xl font-heading font-semibold mb-3">
              Ready to start your project?
            </h2>
            <p className="font-body text-sm mb-4">
              Contact us today for a free estimate or emergency support.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-[#924C2E] font-body font-medium px-6 py-3 rounded shadow hover:bg-gray-100 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ServicesPage;