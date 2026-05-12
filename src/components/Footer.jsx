const Footer = () => {
  return (
    <footer className="w-full bg-[#f6f7f8] border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <div>
              <img
                src="../img/meetuplogo.png"
                alt="Meetup Logo"
                className="h-20 object-contain"
              />
            </div>

            <p className="text-gray-500 mt-2 text-sm">
              Discover events, connect with people, and grow your community.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-8 text-gray-600 font-medium">
            <a href="/" className="hover:text-black transition">
              Home
            </a>

            <a href="/Events" className="hover:text-black transition">
              Events
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Meetup. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-black transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
