"use client";

import { useState } from "react";
import {
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Biru Bunga Logo"
            className="w-11 h-11 rounded-full object-cover border-2 border-blue-200 shadow-md"
          />

          <div className="leading-tight">
            <h1 className="font-bold text-lg text-[#2563EB]">
              WBB
            </h1>

            <p className="text-[11px] text-slate-500">
              Warkop Biru Bunga
            </p>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 font-medium text-[#1E293B]">
          <a
            href="/"
            className="hover:text-[#2563EB] transition"
          >
            Home
          </a>

          <a
            href="/menu"
            className="hover:text-[#2563EB] transition"
          >
            Menu
          </a>

          <a
            href="/#about"
            className="hover:text-[#2563EB] transition"
          >
            About
          </a>

          <a
            href="/#gallery"
            className="hover:text-[#2563EB] transition"
          >
            Gallery
          </a>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* ORDER BUTTON */}
          <a
            href="/menu"
            className="hidden md:flex bg-[#2563EB] text-white px-5 py-2 rounded-full hover:scale-105 transition duration-300 shadow-lg"
          >
            Explore Menu
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="md:hidden w-11 h-11 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#2563EB]"
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5">
          <div className="bg-white rounded-[28px] shadow-xl border border-blue-100 p-5 flex flex-col gap-4">
            <a
              href="/"
              onClick={() =>
                setOpen(false)
              }
              className="text-[#1E293B] hover:text-[#2563EB] transition"
            >
              Home
            </a>

            <a
              href="/menu"
              onClick={() =>
                setOpen(false)
              }
              className="text-[#1E293B] hover:text-[#2563EB] transition"
            >
              Menu
            </a>

            <a
              href="/#about"
              onClick={() =>
                setOpen(false)
              }
              className="text-[#1E293B] hover:text-[#2563EB] transition"
            >
              About
            </a>

            <a
              href="/#gallery"
              onClick={() =>
                setOpen(false)
              }
              className="text-[#1E293B] hover:text-[#2563EB] transition"
            >
              Gallery
            </a>

            {/* MOBILE ORDER BUTTON */}
            <a
              href="/order"
              onClick={() =>
                setOpen(false)
              }
              className="bg-[#2563EB] text-white py-3 rounded-2xl text-center font-medium mt-2"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}