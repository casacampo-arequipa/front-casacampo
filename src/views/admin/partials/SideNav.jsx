/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Drawer, Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import NavData from './NavData';

export default function SideNav() {

  return (
    <>
      <div className="flex gap-2 sm:gap-4 items-center justify-center mb-4">
        <a href="/">
          <img
            className="h-auto w-14 sm:w-16"
            src="/images/logo-arequipa-remove.png"
            alt=""
          />
        </a>
        <div className="cursor-pointer pt-1">
          <Link to="/">
            <h1 className="text-base sm:text-lg font-bold text-red-700">
              Casa Campo
            </h1>
          </Link>
          <div className="text-xs sm:text-sm font-semibold -mt-1">
            Arequipa
          </div>
        </div>
      </div>
      <div className="px-2 py-1 text-xs bg-gradient-to-tr from-red-600 bg-red-500 w-full rounded-lg text-center text-white mb-3">
        Administrador
      </div>
      <div className="flex flex-col gap-2 ">
        {NavData.map((item, index) => (
          <Link to={item.rute} key={index}>
            <div className="flex items-center justify-between truncate hover:bg-gray-100 group py-2 px-2 rounded-lg hover:shadow">
              <div className="flex items-center ">
                <span className="text-gray-500 group-hover:text-gray-800 duration-500">
                  <i className={`${item.icon} fa-fw`}></i>
                </span>
                <span className="text-sm ml-3 2xl:opacity-100 duration-200">
                  {item.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
