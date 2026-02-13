import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-20">
      <div className="max-w-screen-lg py-10 px-4 sm:px-6 text-gray-800 sm:flex justify-between mx-auto">
        
        {/* Menu */}
       

        {/* Center Section */}
        <div className="p-5 sm:w-7/12 border-r text-center">
          <h3 className="font-bold text-xl text-indigo-600 mb-4">Componentity</h3>
          <p className="text-gray-500 text-sm mb-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Contact */}
        <div className="p-5 sm:w-3/12">
          <div className="text-sm uppercase text-indigo-600 font-bold">Contact Us</div>
          <ul>
            <li className="my-2">
              <a className="hover:text-indigo-600" href="#">XXX XXXX, Floor 4 San Francisco, CA</a>
            </li>
            <li className="my-2">
              <a className="hover:text-indigo-600" href="#">contact@company.com</a>
            </li>
          </ul>
        </div>
      </div>


      


      </div>

  );
};

export default Footer;
