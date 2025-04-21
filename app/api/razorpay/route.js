import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import User from "@/app/models/User";
import connectDB from "@/db/connectDB";
import Razorpay from "razorpay";

export const POST = async (req) => {
  await connectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);
  console.log("Body", body);

  //Check if razorpay order id is present on the server
  let p = await Payment.findOne({ order_id: body.razorpay_order_id });

  console.log("Payment Found in DB:", p);

  if (!p) {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }

  console.log("Order ID:", body.razorpay_order_id);
  console.log("Payment ID:", body.razorpay_payment_id);
  console.log("Signature:", body.razorpay_signature);
  console.log(
    "Secret (Before Function Call):",
    process.env.RAZORPAY_KEY_SECRET
  );

  //Check if the payment is already verified
  let verified = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    process.env.RAZORPAY_KEY_SECRET
  );
  
  if (verified) {
    const updatedPayment = await Payment.findOneAndUpdate(
        { _id: p._id }, // Find the document by ID
        { done: true },  // Update the "done" field
        { new: true }    // Return the updated document
      );
     await updatedPayment.save(); 
    console.log("Updated Payment==", updatedPayment);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${updatedPayment.to_user}?paymentdone=true`,
      { status: 302 }
    );
  } else {
    return NextResponse.error(
      { message: "Payment verification failed" },
      { status: 500 }
    );
  }
};
