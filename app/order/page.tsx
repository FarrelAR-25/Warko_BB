"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import Navbar from "../components/navbar";

import TableSelector from "../components/order/table-selector";
import MenuCard from "../components/order/menu-card";
import OrderSummary from "../components/order/order-summary";

import { db } from "../lib/firebase";

export default function OrderPage() {
  // CUSTOMER INFO
  const [table, setTable] =
    useState("01");

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [people, setPeople] =
    useState("2 Orang");

  const [service, setService] =
    useState("Dine In");

  // SEARCH + FILTER
  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  // MENU
  const [menus, setMenus] =
    useState<any[]>([]);

  // CART
  const [cart, setCart] =
    useState<any[]>([]);

  // MOBILE DRAWER
  const [openCart, setOpenCart] =
    useState(false);

  // GET MENU REALTIME
  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(db, "menus"),
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc, index) => ({
                id:
                  doc.id ||
                  index,

                firestoreId:
                  doc.id,

                ...doc.data(),
              })
            );

          setMenus(data);
        }
      );

    return () =>
      unsubscribe();
  }, []);

  // ADD TO CART
  const addToCart = (
    menu: any
  ) => {
    const exist = cart.find(
      (item) =>
        item.id === menu.id
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === menu.id
            ? {
                ...item,
                qty:
                  item.qty + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...menu,
          qty: 1,
        },
      ]);
    }
  };

  // INCREASE
  const increaseQty = (
    id: number
  ) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty:
                item.qty + 1,
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (
    id: number
  ) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty:
                  item.qty - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.qty > 0
        )
    );
  };

  // REMOVE
  const removeItem = (
    id: number
  ) => {
    setCart(
      cart.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  // SUBTOTAL
  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      item.price * item.qty,
    0
  );

  // FILTER MENU
  const filteredMenus =
    menus.filter((menu) => {
      const matchSearch =
        menu.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =
        selectedCategory ===
        "All"
          ? true
          : menu.category ===
            selectedCategory;

      return (
        matchSearch &&
        matchCategory
      );
    });

  return (
    <main className="relative bg-[#F8FAFC] min-h-screen text-[#1E293B] overflow-hidden">
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute top-[30%] right-0 w-[350px] h-[350px] bg-sky-200/30 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-[20%] w-[250px] h-[250px] bg-indigo-200/30 rounded-full blur-3xl" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10">
        <Navbar />

        <section className="pt-24 pb-24">
          <div className="max-w-7xl mx-auto px-4 md:px-5">
            {/* TABLE */}
            <TableSelector
              customerName={
                customerName
              }
              setCustomerName={
                setCustomerName
              }
              table={table}
              setTable={setTable}
              people={people}
              setPeople={setPeople}
              service={service}
              setService={
                setService
              }
            />

            {/* MAIN */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
              {/* LEFT */}
              <div>
                {/* SEARCH */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-md border border-white/50 mb-5 flex items-center gap-3">
                  <Search className="text-[#2563EB] min-w-[20px]" />

                  <input
                    type="text"
                    placeholder="Cari menu favorit..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    className="w-full outline-none bg-transparent text-[#1E293B] placeholder:text-slate-400 text-sm"
                  />
                </div>

                {/* CATEGORY */}
                <div className="flex gap-3 mb-5 overflow-x-auto pb-1">
                  {[
                    "All",
                    "Coffee",
                    "Non Coffee",
                    "Snack",
                    "Makanan",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() =>
                        setSelectedCategory(
                          item
                        )
                      }
                      className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition ${
                        selectedCategory ===
                        item
                          ? "bg-[#2563EB] text-white shadow-lg"
                          : "bg-white/80 backdrop-blur-md border border-white/50 text-slate-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* MENU GRID */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {/* EMPTY */}
                  {filteredMenus.length ===
                    0 && (
                    <div className="col-span-full bg-white/80 backdrop-blur-md rounded-2xl p-10 text-center border border-white/50 shadow-md text-slate-400">
                      Menu tidak ditemukan
                    </div>
                  )}

                  {/* MENU */}
                  {filteredMenus.map(
                    (menu) => (
                      <MenuCard
                        key={
                          menu.firestoreId
                        }
                        menu={menu}
                        addToCart={
                          addToCart
                        }
                      />
                    )
                  )}
                </div>
              </div>

              {/* DESKTOP CART */}
              <div className="hidden xl:block">
                <OrderSummary
  customerName={customerName}
  cart={cart}
  setCart={setCart}
  subtotal={subtotal}
  service={service}
  table={table}
  people={people}
  increaseQty={increaseQty}
  decreaseQty={decreaseQty}
  removeItem={removeItem}
/>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE FLOATING CART */}
      <button
        onClick={() =>
          setOpenCart(true)
        }
        className="xl:hidden fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#2563EB] to-blue-500 text-white shadow-2xl flex items-center justify-center hover:scale-105 transition"
      >
        <div className="relative">
          <ShoppingBag size={24} />

          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </div>
      </button>

      {/* MOBILE CART DRAWER */}
      <div
        className={`xl:hidden fixed inset-0 z-[60] transition duration-300 ${
          openCart
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() =>
            setOpenCart(false)
          }
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* DRAWER */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-[#F8FAFC] rounded-t-[28px] p-4 max-h-[90vh] overflow-y-auto transition duration-300 ${
            openCart
              ? "translate-y-0"
              : "translate-y-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-[#1E293B]">
              Your Cart
            </h2>

            <button
              onClick={() =>
                setOpenCart(false)
              }
              className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          <OrderSummary
  customerName={customerName}
  cart={cart}
  setCart={setCart}
  subtotal={subtotal}
  service={service}
  table={table}
  people={people}
  increaseQty={increaseQty}
  decreaseQty={decreaseQty}
  removeItem={removeItem}
/>
        </div>
      </div>
    </main>
  );
}