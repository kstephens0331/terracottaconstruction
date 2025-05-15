function Footer() {
  return (
    <footer className="bg-[#924C2E] text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
        <p className="text-sm sm:text-base">
          &copy; 2025 Terracotta Construction. All rights reserved. <br className="md:hidden" />
          Built by StephensCode LLC
        </p>
        <div className="space-x-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;