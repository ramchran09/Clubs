import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-100 to-cyan-100 mt-24 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-gray-700">

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            ClubZ0ne
          </h2>
          <p className="text-sm leading-relaxed">
            ClubZ0ne is a centralized digital platform built for college students 
            to explore clubs, join events, and stay connected with campus activities. 
            Bringing all communities together in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg text-blue-600 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Clubs</li>
            <li className="hover:text-blue-600 cursor-pointer">Events</li>
            <li className="hover:text-blue-600 cursor-pointer">Posts</li>
          </ul>
        </div>

        {/* College Details */}
        <div>
          <h3 className="font-semibold text-lg text-blue-600 mb-4">
            Screenindhi Hyderabad College
          </h3>
          <p className="text-sm">
            📍 Hyderabad, Telangana, India
          </p>
          <p className="text-sm mt-2">
            📧 clubzone@screenindhi.edu.in
          </p>
          <p className="text-sm mt-2">
            📞 +91 98765 43210
          </p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-600 mt-12">
        © {new Date().getFullYear()} ClubZ0ne | Built with ❤️ for Campus Innovation
      </div>
    </footer>
  );
};

export default Footer;