export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import midtransClient from "midtrans-client";

const core = new midtransClient.CoreApi({
  isProduction:
    process.env.MIDTRANS_IS_PRODUCTION === "true",

  serverKey:
    process.env.MIDTRANS_SERVER_KEY!,

  clientKey:
    process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      orderId,
      total,
      customerName,
    } = body;

    if (
      !orderId ||
      !total ||
      !customerName
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data transaksi tidak lengkap.",
        },
        {
          status: 400,
        }
      );
    }

    const parameter = {
      payment_type: "qris",

      transaction_details: {
        order_id: orderId,
        gross_amount: Number(total),
      },

      customer_details: {
        first_name: customerName,
      },

      qris: {
        acquirer: "gopay",
      },
    };

    console.log("========== MIDTRANS REQUEST ==========");
    console.log(parameter);

    const transaction =
      await core.charge(parameter);

    console.log("========== MIDTRANS RESPONSE ==========");
    console.dir(transaction, {
      depth: null,
    });

    const qrAction =
      transaction.actions?.find(
        (item: any) =>
          item.name ===
          "generate-qr-code"
      );

    const deeplink =
      transaction.actions?.find(
        (item: any) =>
          item.name ===
          "deeplink-redirect"
      );

    return NextResponse.json({
      success: true,

      transactionId:
        transaction.transaction_id,

      orderId:
        transaction.order_id,

      paymentType:
        transaction.payment_type,

      transactionStatus:
        transaction.transaction_status,

      qrUrl:
        qrAction?.url ?? null,

      deeplink:
        deeplink?.url ?? null,

      actions:
        transaction.actions,
    });

  } catch (error: any) {

    console.log("========== MIDTRANS ERROR ==========");

    console.dir(error, {
      depth: null,
    });

    console.log("====================================");

    return NextResponse.json(
      {
        success: false,

        message:
          error?.ApiResponse
            ?.error_messages?.[0] ??
          error?.message ??
          "Gagal membuat transaksi.",
      },
      {
        status: 500,
      }
    );
  }
}