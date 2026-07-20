"use client";

import { useState } from "react";
import {
  X,
  Copy,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  total: number;
  orderId: string;
  onSuccess: () => void;
}

export default function PaymentModal({
  open,
  onClose,
  total,
  orderId,
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [paymentUrl, setPaymentUrl] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  if (!open) return null;

  // ==========================
  // CREATE MIDTRANS
  // ==========================

  const handleCreatePayment =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/midtrans",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                orderId,

                total,

                customerName:
                  "Customer",

              }),

            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {

          throw new Error(
            data.message ??
              "Gagal membuat pembayaran."
          );

        }

        setPaymentUrl(
          data.redirectUrl
        );

      } catch (error: any) {

        console.error(error);

        alert(
          error.message ??
            "Terjadi kesalahan."
        );

      } finally {

        setLoading(false);

      }

    };

  // ==========================
  // COPY URL
  // ==========================

  const copyLink =
    async () => {

      if (!paymentUrl) return;

      await navigator.clipboard.writeText(
        paymentUrl
      );

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    };

  // ==========================
  // OPEN MIDTRANS
  // ==========================

  const openPayment =
    () => {

      if (!paymentUrl) return;

      window.open(
        paymentUrl,
        "_blank"
      );

    };

      return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="bg-white w-full max-w-lg rounded-[30px] shadow-2xl overflow-hidden">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-[#2563EB] to-blue-500 p-6 text-white relative">

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X size={18} />
          </button>

          <p className="uppercase tracking-[4px] text-sm text-blue-100">
            Midtrans Payment
          </p>

          <h2 className="text-3xl font-black mt-2">
            QRIS Dynamic
          </h2>

          <p className="text-blue-100 mt-2 text-sm">
            Gunakan QRIS Midtrans untuk menyelesaikan pembayaran.
          </p>

        </div>

        {/* BODY */}

        <div className="p-6">

          {/* ORDER */}

          <div className="bg-slate-50 rounded-2xl border p-5 space-y-4">

            <div className="flex justify-between">

              <span className="text-slate-500">
                Order ID
              </span>

              <span className="font-bold">
                {orderId}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Total
              </span>

              <span className="text-2xl font-black text-[#2563EB]">
                Rp {total.toLocaleString("id-ID")}
              </span>

            </div>

          </div>

          {/* BUTTON CREATE */}

          {!paymentUrl && (

            <button
              onClick={handleCreatePayment}
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-[#2563EB] to-blue-500 text-white py-4 rounded-2xl font-bold hover:opacity-90 transition"
            >

              {loading
                ? "Membuat Pembayaran..."
                : "Generate QRIS"}

            </button>

          )}

          {/* URL */}

          {paymentUrl && (

            <>

              <div className="mt-6">

                <p className="text-sm font-semibold text-slate-600 mb-2">

                  Link Pembayaran

                </p>

                <div className="border rounded-xl bg-slate-50 p-3 break-all text-sm text-slate-700">

                  {paymentUrl}

                </div>

              </div>

              {/* COPY */}

              <button
                onClick={copyLink}
                className="mt-4 w-full border border-blue-200 hover:bg-blue-50 text-[#2563EB] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >

                <Copy size={18} />

                {copied
                  ? "Link Berhasil Disalin"
                  : "Copy Link"}

              </button>

              {/* OPEN */}

              <button
                onClick={openPayment}
                className="mt-3 w-full bg-gradient-to-r from-[#2563EB] to-blue-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >

                <ExternalLink size={20} />

                Buka QRIS Midtrans

              </button>

              {/* INFO */}

              <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 p-4">

                <div className="flex gap-3">

                  <CheckCircle2
                    size={20}
                    className="text-blue-600 mt-0.5"
                  />

                  <div>

                    <p className="font-semibold text-blue-700">

                      Menunggu Pembayaran

                    </p>

                    <p className="text-sm text-blue-600 mt-1">

                      Klik tombol <b>Buka QRIS Midtrans</b>,
                      kemudian scan QR menggunakan aplikasi
                      e-wallet atau mobile banking.

                      Setelah pembayaran berhasil,
                      status order akan otomatis berubah
                      melalui webhook Midtrans.

                    </p>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );

}