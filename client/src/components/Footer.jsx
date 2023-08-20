import React from "react";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto flex flex-col items-center w-full text-center">
        <div className="mb-4 w-full">
          <h2 className="text-2xl font-semibold">WeBlogWiz</h2>
          <p className="mt-2">Your go-to source for all things blogging!</p>
        </div>
        <div className="flex space-x-6">
          <a href="/" className="hover:text-cyan-400 hover:font-semibold transition duration-300">
            Home
          </a>
          <a href="#" className="hover:text-cyan-400 hover:font-semibold transition duration-300">
            About Us
          </a>
          <a href="#" className="hover:text-cyan-400 hover:font-semibold transition duration-300">
            Contact
          </a>
        </div>
        <div className="mt-4">
          <p>
            &copy; {new Date().getFullYear()} WeBlogWiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
