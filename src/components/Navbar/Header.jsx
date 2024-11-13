/* eslint-disable no-unused-vars */
import React from 'react'

export default function Header({
  position,
  page,
}) {
  return (
    <>
      <div className={`lg:flex md:flex md:justify-between items-center lg:justify-between text-[0.625rem] md:text-xs px-4 py-1 sm:flex-none rounded-b-2xl transition-all duration-500 ${page
        ? position > 0
          ? 'bg-red-800 text-white'
          : 'bg-black/30'
        : 'bg-red-800 text-white'
        }`}>
        <ul className="flex space-x-4 justify-center flex-wrap">
          <li className="flex items-center">
            <i className="fa-solid fa-location-dot mr-1"></i>Arequipa
          </li>
          <li className="flex items-center">
            <i className="fa-solid fa-phone mr-1"></i>+51 987563711

          </li>
          <li className="flex items-center">
            <i className="fa-solid fa-envelope mr-1"></i><a href="mailto:arequipacasacampo@gmail.com">arequipacasacampo@gmail.com</a>
          </li>
        </ul>
      </div>
    </>
  )
}