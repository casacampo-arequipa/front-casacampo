import React from "react";

const SocialMediaIcons = () => {
  return (
    <div className="fixed top-1/3 right-0 flex flex-col items-end gap-2 p-2 z-50 text-sm md:text-xl">
      <a
        href="https://www.facebook.com/profile.php?id=61564315336410&locale=es_LA"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform duration-500"
      >
        <div className="flex justify-center items-center bg-red-800 hover:bg-green-800 text-white rounded-full shadow-md h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12">
          <i className="fa-brands fa-facebook-f"></i>
        </div>
      </a>

      <a
        href="https://www.instagram.com/Casacampoaqp/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform"
      >
        <div className="flex justify-center items-center bg-red-800 hover:bg-green-800 text-white rounded-full shadow-md h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12">
          <i className="fa-brands fa-instagram"></i>
        </div>
      </a>

      <a
        href="https://www.tiktok.com/@casacampo.arequipa"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-110 transition-transform"
      >
        <div className="flex justify-center items-center bg-red-800 hover:bg-green-800 text-white rounded-full shadow-md h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12">
          <i className="fa-brands fa-tiktok"></i>
        </div>
      </a>
    </div>
  );
};

export default SocialMediaIcons;
