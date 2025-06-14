import React from 'react';
import { Link } from "react-router-dom";
import TypingEffect from './Typing';

function Hero() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center px-4 text-white text-center">
      <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:<br />
          <span className="text-white"><TypingEffect /></span>
        </span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Link to="/CreateTrip">
      <a href="/my-trips">
    <button className="relative inline-block px-6 py-2 font-semibold h-15 w-50 text-blue-700 bg-white rounded-xl overflow-hidden shadow group transition-all duration-300 hover:text-white">
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition duration-500 ease-out z-0"></span>
      <span className="absolute -left-full top-0 w-full h-full bg-white opacity-20 transform skew-x-12 group-hover:animate-shine"></span>
      <span className="relative z-10 cursor-pointer text-2xl">Get Started!!</span>
    </button>
</a>

      </Link>
    </div>
  );
}

export default Hero;
