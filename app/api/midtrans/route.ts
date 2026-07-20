import { NextRequest, NextResponse } from "next/server";
import snap from "@/app/lib/midtrans";

export async function POST(req: NextRequest) {
  try {
    const { orderId, total, customerName } = await req.json();

    const parameter: any = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },

      customer_details: {
        first_name: customerName,
      },
      
     enabled_payments: [
  "gopay",
  "shopeepay",
  "other_qris",
  "bank_transfer",
  "bca_va",
  "bni_va",
  "bri_va",
  "permata_va",
]
      };

    const transaction = await snap.createTransaction(parameter);
    console.log("Transaction created:", transaction.redirect_url);
    console.log("========== MIDTRANS REQUEST ==========");
console.log(parameter);

console.log("========== MIDTRANS RESPONSE ==========");
console.dir(transaction, { depth: null });
    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed create transaction",
      },
      {
        status: 500,
      }
    );
  }
}