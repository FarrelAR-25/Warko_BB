"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  MapPin,
  Clock3,
  Phone,
  AtSign,
} from "lucide-react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import {
  espressoMenu,
  manualBrew,
} from "../data/menu-data";

export default function MenuPage() {
  return (
    <main className="bg-[#F8FAFC] text-[#1E293B] overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-10 relative">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black text-[#2563EB] leading-none">
                WBB
                <br />
                MENU
              </h1>

              <p className="text-xl mt-5 text-[#2563EB] font-light tracking-wide">
                OPEN 14.00 - 23.30 WIB
              </p>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className=" rounded-full w-[250px] h-[250px] flex flex-col justify-center items-center">
               <img
            src="/logo.png"
            alt="Biru Bunga Logo"
            className="w-250 h-250 rounded-full object-cover border-2 border-blue-200 shadow-md"
          />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CHECKER */}
        <div className="absolute top-28 right-8 hidden lg:grid grid-cols-2 gap-1">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 ${
                index % 2 === 0
                  ? "bg-[#2563EB]"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ESPRESSO */}
      <section className="py-5 relative">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white border-[2px] border-[#2563EB] rounded-[30px] p-7 shadow-lg"
          >
            {/* BLUE BAR */}
            <div className="absolute top-0 right-0 h-full w-6 bg-[#2563EB] rounded-r-[30px]" />

            <h2 className="text-3xl font-black text-[#2563EB] mb-7">
              ESPRESSO BASED
            </h2>

            <div className="space-y-4">
              {espressoMenu.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2"
                >
                  <p className="text-lg">
                    • {item.name}
                  </p>

                  <p className="text-lg font-semibold text-[#2563EB]">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CHECKER */}
        <div className="absolute top-24 left-8 hidden lg:grid grid-cols-2 gap-1">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 ${
                index % 2 === 0
                  ? "bg-[#2563EB]"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </section>

      {/* MANUAL BREW */}
      <section className="py-5 relative">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white border-[2px] border-[#2563EB] rounded-[30px] p-7 shadow-lg"
          >
            {/* BLUE BAR */}
            <div className="absolute top-0 left-0 h-full w-6 bg-[#2563EB] rounded-l-[30px]" />

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* CONTENT */}
              <div className="pl-4">
                <h2 className="text-3xl font-black text-[#2563EB] mb-7">
                  MANUAL BREW
                </h2>

                <div className="space-y-4">
                  {manualBrew.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-dashed border-slate-300 pb-2"
                    >
                      <p className="text-lg">
                        • {item.name}
                      </p>

                      <p className="text-lg font-semibold text-[#2563EB]">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

        
            </div>
          </motion.div>
        </div>

        {/* CHECKER */}
        <div className="absolute top-24 right-8 hidden lg:grid grid-cols-2 gap-1">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 ${
                index % 2 === 0
                  ? "bg-[#2563EB]"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#2563EB] rounded-[30px] p-7 text-white flex flex-col lg:flex-row justify-between items-center gap-6"
          >
            <div>
              <div className="bg-white text-[#2563EB] px-5 py-2 rounded-full inline-block mb-4 font-bold text-sm">
                USE HASHTAGS
              </div>

              <h2 className="text-2xl lg:text-4xl font-black">
                #MOREECONOMICALCOFFEE
              </h2>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-2xl font-bold">
                Up to 25% off
              </p>

              <p className="text-lg mt-1 text-blue-100">
                all coffee milk!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO */}
      <section className="pb-14">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-5">
            {/* LOCATION */}
            <div className="bg-white rounded-3xl p-5 shadow-md border border-blue-100">
              <MapPin className="text-[#2563EB] mb-3" />

              <h3 className="font-bold text-lg mb-2">
                Location
              </h3>

              <p className="text-slate-600 text-sm">
                Jakarta, Indonesia
              </p>
            </div>

            {/* OPEN */}
            <div className="bg-white rounded-3xl p-5 shadow-md border border-blue-100">
              <Clock3 className="text-[#2563EB] mb-3" />

              <h3 className="font-bold text-lg mb-2">
                Open Hours
              </h3>

              <p className="text-slate-600 text-sm">
                14.00 - 23.30 WIB
              </p>
            </div>

            {/* CONTACT */}
            <div className="bg-white rounded-3xl p-5 shadow-md border border-blue-100">
              <Phone className="text-[#2563EB] mb-3" />

              <h3 className="font-bold text-lg mb-2">
                Contact
              </h3>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <AtSign size={15} />
                webebe01
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}