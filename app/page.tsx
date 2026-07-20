"use client";

import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock3,
} from "lucide-react";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import {
  menus,
  gallery,
} from "./data/data";

export default function Home() {
  return (
    <main className="bg-[#F8FAFC] text-[#1E293B] overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-24"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#2563EB] font-semibold mb-4 tracking-widest">
              Warkop Biru Bunga
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Kerabat Dekat
              <span className="text-[#2563EB]">
                {" "}Kamu{" "}
              </span>
              Sejak 2022
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Open daily from 14.00 to 23.30 ,
              Warkop Biru Bunga is your.
              <br />
              (23.00 Close Order)
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href="/order"
                className="bg-[#2563EB] text-white px-7 py-4 rounded-full hover:scale-105 transition duration-300 shadow-xl inline-block"
              >
                Order Now
              </a>

              <a
                href="https://maps.app.goo.gl/KFNCtFVvszLWSxKJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#2563EB] px-7 py-4 rounded-full hover:bg-[#2563EB] hover:text-white transition duration-300"
              >
                Visit Cafe
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <img
              src="/main.jpg"
              alt="coffee"
              className="rounded-[40px] shadow-2xl object-cover h-[550px] w-full"
            />

            {/* FLOATING CARD */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-3xl shadow-2xl">
              <div className="flex items-center gap-3">
                <Star className="fill-yellow-400 text-yellow-400" />

                <div>
                  <p className="font-bold">
                    4.9 Rating
                  </p>

                  <p className="text-sm text-gray-500">
                    Favorite Coffee Shop
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-semibold tracking-widest">
              BEST SELLER MENU
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Our Popular Drinks
            </h2>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-8">
            {menus.map((menu, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[35px] overflow-hidden shadow-lg hover:shadow-2xl"
              >
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {menu.name}
                  </h3>

                  <div className="flex justify-between items-center">
                    <p className="text-[#2563EB] font-bold text-xl">
                      {menu.price}
                    </p>

                    <button className="bg-[#2563EB] text-white px-5 py-2 rounded-full hover:scale-105 transition">
                      Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-24 bg-[#DBEAFE]"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="rounded-[40px] shadow-2xl object-cover h-[550px] w-full"
          >
            <source src="/vid.mp4" type="video/mp4" />
          </video>

          {/* CONTENT */}
          <div>
            <p className="text-[#2563EB] font-semibold mb-4 tracking-widest">
              ABOUT US
            </p>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Cozy Place To Relax & Enjoy
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Warkop Biru langit menghadirkan suasana santai
              dengan gaya minimalis dengan pemandangan danau
              dan senja disore hari.
            </p>

            <div className="space-y-5">
              <div className="flex gap-4 items-center">
                <MapPin className="text-[#2563EB]" />
                <p>Jakarta, Indonesia 12630</p>
              </div>

              <div className="flex gap-4 items-center">
                <Clock3 className="text-[#2563EB]" />
                <p>Open Everyday • 14.00 - 23.30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* TITLE */}
          <div className="text-center mb-16">
            <p className="text-[#2563EB] font-semibold tracking-widest">
              GALLERY
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Our Cafe Moments
            </h2>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((image, index) => (
              <motion.img
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                src={image}
                alt="gallery"
                className="rounded-[30px] h-[350px] w-full object-cover shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}