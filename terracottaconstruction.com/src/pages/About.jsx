import Footer from '../components/Footer';

function AboutPage() {
  return (
    <>
      <section className="py-16 bg-white text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#924C2E]">About Terracotta Construction</h1>
        
        <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
          Founded in 2010, Terracotta Construction has proudly served the state of Texas for over a decade. 
          We are more than just a contractor — we are a long-term partner committed to quality, trust, and customer relationships. 
          Our mission is simple: to provide dependable construction services while building lasting connections with every client we serve.
        </p>

        <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
          From residential projects to full-scale commercial property maintenance, our team handles it all. 
          We work with apartment complexes, condos, multi-family units, and individual homes across Texas to deliver 
          reliable services that meet both everyday needs and long-term property goals.
        </p>

        <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
          Our offerings include general handyman services, emergency repairs, fencing, metal building construction, 
          landscaping, and full-service lawn care. Whether you're a homeowner needing quick fixes or a property manager 
          coordinating multiple buildings, Terracotta Construction provides professional, on-time solutions with care and precision.
        </p>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Based in Texas, we proudly serve clients throughout the entire state — from rural towns to major urban centers. 
          No matter where you're located, you can count on us for honest work, competitive pricing, and a crew that treats your project like their own.
        </p>
      </section>

      <Footer />
    </>
  );
}

export default AboutPage;