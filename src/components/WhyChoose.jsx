import React from 'react';
import { ThumbsUp, Clock, ShieldCheck, Users } from 'lucide-react';

const benefits = [
  {
    icon: <ThumbsUp className="w-8 h-8 text-[#924C2E]" />,
    title: 'Reliable Craftsmanship',
    description: 'We show up on time, deliver what we promise, and never cut corners.',
  },
  {
    icon: <Clock className="w-8 h-8 text-[#924C2E]" />,
    title: 'Fast Turnaround',
    description: 'From emergencies to maintenance, we handle projects quickly and efficiently.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#924C2E]" />,
    title: 'Licensed & Insured',
    description: 'Peace of mind with full coverage and industry-compliant safety standards.',
  },
  {
    icon: <Users className="w-8 h-8 text-[#924C2E]" />,
    title: 'Family-Owned & Local',
    description: 'Proudly based in Montgomery, serving our neighbors with care.',
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8">
          Why Choose Terracotta Construction?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-body text-gray-800">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-left"
            >
              <div className="mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-[#924C2E] mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;