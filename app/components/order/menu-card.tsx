"use client";

import {
  Plus,
} from "lucide-react";

interface Props {
  menu: any;
  addToCart: (menu: any) => void;
}

export default function MenuCard({
  menu,
  addToCart,
}: Props) {
  const isSoldOut = menu.soldOut === true;

  return (
    <div className="group bg-white/80 backdrop-blur-md border border-white/50 rounded-[24px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition flex flex-col">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={menu.image}
          alt={menu.name}
          className={`w-full h-36 md:h-44 object-cover transition duration-500 ${
            isSoldOut
              ? "grayscale opacity-60"
              : "group-hover:scale-105"
          }`}
        />

        {/* SOLD OUT OVERLAY */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <div className="bg-red-500 text-white px-5 py-2 rounded-full font-black text-sm md:text-base shadow-xl">
              SOLD OUT
            </div>
          </div>
        )}

        {/* NORMAL OVERLAY */}
        {!isSoldOut && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        )}

        {/* CATEGORY */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-md text-[#2563EB] px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold shadow-md">
            {menu.category}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">

        {/* TITLE */}
        <div className="mb-4 flex-1">
          <h2 className="font-black text-sm md:text-lg text-[#1E293B] line-clamp-1">
            {menu.name}
          </h2>

          <p className="text-slate-500 text-[11px] md:text-sm mt-1 line-clamp-2">
            {menu.description}
          </p>
        </div>

        {/* BOTTOM */}
        <div className="flex items-center justify-between gap-3">

          {/* PRICE */}
          <div>
            <p className="text-[10px] md:text-xs text-slate-400 mb-1">
              Price
            </p>

            <h3
              className={`font-black text-sm md:text-lg ${
                isSoldOut
                  ? "text-slate-400"
                  : "text-[#2563EB]"
              }`}
            >
              Rp{" "}
              {menu.price.toLocaleString()}
            </h3>
          </div>

          {/* BUTTON */}
          {isSoldOut ? (
            <button
              disabled
              className="px-4 h-10 md:h-12 rounded-2xl bg-slate-300 text-slate-500 flex items-center justify-center text-[11px] md:text-sm font-bold cursor-not-allowed"
            >
              SOLD OUT
            </button>
          ) : (
            <button
              onClick={() => addToCart(menu)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
            >
              <Plus size={18} />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}