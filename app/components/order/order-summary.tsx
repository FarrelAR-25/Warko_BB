"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";
import CartItem from "./cart-item";

interface Props {
  customerName: string;
  cart: any[];
  setCart: React.Dispatch<
    React.SetStateAction<any[]>
  >;
  subtotal: number;
  service: string;
  table: string;
  people: string;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  removeItem: (id: number) => void;
}

export default function OrderSummary({
  customerName,
  cart,
  setCart,
  subtotal,
  service,
  table,
  people,
  increaseQty,
  decreaseQty,
  removeItem,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  // ==========================
  // VALIDASI
  // ==========================

  const validateOrder = () => {
    if (!customerName.trim()) {
      alert("Masukkan nama pemesan.");
      return false;
    }

    if (cart.length === 0) {
      alert("Cart masih kosong.");
      return false;
    }

    return true;
  };

  // ==========================
  // GENERATE ORDER ID
  // ==========================

const generateOrderId = async () => {

  const snapshot =
    await getDocs(
      collection(db, "orders")
    );

  const numbers =
    snapshot.docs
      .map((doc) => {

        const orderId =
          doc.data().orderId;

        if (!orderId)
          return null;

        const number =
          parseInt(
            orderId.replace(
              "WBB-",
              ""
            )
          );

        return isNaN(number)
          ? null
          : number;

      })
      .filter(
        (n): n is number =>
          n !== null
      )
      .sort(
        (a, b) => a - b
      );

  let next = 1;

  for (const n of numbers) {

    if (n === next) {

      next++;

    } else {

      break;

    }

  }

  return `WBB-${String(next).padStart(3, "0")}`;

};

  // ==========================
  // SIMPAN ORDER
  // ==========================

 const saveOrder = async (
  orderId: string,
  midtransOrderId: string | null,
  paymentMethod: string,
  paymentStatus: string,
  transactionId?: string
) => {
    await addDoc(
      collection(db, "orders"),
      {
        orderId,

        midtransOrderId,

        transactionId:
          transactionId ?? null,

        customerName,

        table,

        people,

        service,

        paymentMethod,

        paymentStatus,

        status: "Pending",

        total: subtotal,

        items: cart.map(
          (item) => ({
            id: item.id,
            name: item.name,
            qty: item.qty,
            price: item.price,
            image: item.image,
          })
        ),

        createdAt:
          new Date(),
      }
    );
  };

  // ==========================
  // CASH
  // ==========================

  const handleCashCheckout =
    async () => {
      if (!validateOrder())
        return;

      setLoading(true);

      try {
  const orderId = await generateOrderId();

  await saveOrder(
    orderId,
    null,
    "Cash",
    "Pending"
  );

  alert(`Order ${orderId} berhasil dibuat`);

  setCart([]);

} catch (error) {

  console.error(error);

  alert("Gagal membuat order.");

} finally {

  setLoading(false);

}
    };

  // ==========================
  // MIDTRANS
  // ==========================

  const handleOpenQris =
    async () => {
      if (!validateOrder())
        return;

      setLoading(true);

      try {
        const orderId =
          await generateOrderId();

      const midtransOrderId =
`${orderId}-${Date.now()}`;

const response =
await fetch(
"/api/midtrans",
{
method:"POST",
headers:{
"Content-Type":"application/json",
},
body:JSON.stringify({

orderId:
midtransOrderId,

total:subtotal,

customerName,

}),
});

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              "Gagal membuat transaksi."
          );
        }

        if (!window.snap) {
          throw new Error(
            "Snap Midtrans belum dimuat."
          );
        }

window.snap.pay(data.token, {
  onSuccess: async (result: any) => {
    await saveOrder(
      orderId,
      midtransOrderId,
      "QRIS",
      "Paid",
      result.transaction_id
    );

    alert("Pembayaran berhasil");

    setCart([]);

    window.location.reload();
  },

  onPending: async (result: any) => {
    await saveOrder(
      orderId,
      midtransOrderId,
      "QRIS",
      "Pending",
      result.transaction_id
    );

    alert("Menunggu pembayaran");
  },

  onError: () => {
    alert("Pembayaran gagal");
  },

  onClose: () => {
    console.log("Popup ditutup");
  },
});

} catch (error) {

  console.error(error);

  alert("Terjadi kesalahan saat membuat transaksi.");

} finally {

  setLoading(false);

}

};

  return (
    <div className="bg-white rounded-[24px] p-4 shadow-lg border border-blue-100 xl:sticky xl:top-28">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">

          <ShoppingBag
            className="text-[#2563EB]"
            size={20}
          />

        </div>

        <div>

          <p className="text-xs text-slate-400 uppercase tracking-wide">
            Your Order
          </p>

          <h2 className="text-xl font-black text-[#1E293B]">
            Cart Summary
          </h2>

        </div>

      </div>

      {/* CART */}

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">

        {cart.length === 0 ? (

          <div className="bg-[#F8FAFC] border border-dashed border-blue-100 rounded-2xl p-8 text-center">

            <div className="w-14 h-14 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-4">

              <ShoppingBag className="text-[#2563EB]" />

            </div>

            <h3 className="font-bold text-sm text-[#1E293B]">
              Cart Masih Kosong
            </h3>

            <p className="text-xs text-slate-400 mt-2">
              Tambahkan menu favoritmu terlebih dahulu.
            </p>

          </div>

        ) : (

          cart.map((item) => (

            <CartItem
              key={item.id}
              item={item}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
            />

          ))

        )}

      </div>

      {/* TOTAL */}

      <div className="border-t border-dashed border-slate-200 mt-5 pt-5">

        <div className="space-y-3 mb-5">

          <div className="flex justify-between text-sm">

            <span className="text-slate-500">
              Customer
            </span>

            <span className="font-semibold">
              {customerName || "-"}
            </span>

          </div>

          <div className="flex justify-between text-sm">

            <span className="text-slate-500">
              Table
            </span>

            <span className="font-semibold">
              {table}
            </span>

          </div>

          <div className="flex justify-between text-sm">

            <span className="text-slate-500">
              Service
            </span>

            <span className="font-semibold">
              {service}
            </span>

          </div>

          <div className="flex justify-between text-sm">

            <span className="text-slate-500">
              People
            </span>

            <span className="font-semibold">
              {people}
            </span>

          </div>

        </div>

        <div className="bg-gradient-to-r from-[#2563EB] to-blue-500 rounded-2xl p-4 text-white mb-5">

          <p className="text-blue-100 text-xs uppercase tracking-wide">
            Total Payment
          </p>

          <h2 className="text-2xl font-black mt-2">
            Rp {subtotal.toLocaleString("id-ID")}
          </h2>

        </div>

        <div className="space-y-3">

          <button
            onClick={handleCashCheckout}
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-black text-white"
            }`}
          >
            {loading
              ? "Memproses..."
              : "Bayar ke Kasir"}
          </button>

          <button
            onClick={handleOpenQris}
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#2563EB] to-blue-500 hover:opacity-90"
            }`}
          >
            {loading
              ? "Membuka Midtrans..."
              : "Bayar dengan QRIS"}
          </button>

        </div>

      </div>

    </div>
  );

}