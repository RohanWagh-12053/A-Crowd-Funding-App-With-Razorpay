"use server";
import mongoose from "mongoose";
import connectDB from "@/db/connectDB";
import Razorpay from "razorpay";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";

export const initiatePayment = async (amount, to_username, paymentForm) => {
  await connectDB();
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {},
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);
  console.log("PAYMENT FORM", paymentForm);
  await Payment.create({
    name: paymentForm.name,
    to_user: to_username,
    order_id: x.id,
    message: paymentForm.message,
    amount: amount,
  });

  return x;
};

export const fetchUser = async (params) => {
  // console.log("Fetching user:", params);

  let u = await User.findOne({ name: params });

  if (!u) {
    console.log("User not found in DB");
    return null; // Return null to avoid `.toObject()` error
  }

  // console.log("User found:", u);
  let user = u.toObject({ flattenObjectIds: true });

  return user;
};

export const fetchPayments = async (username) => {
  await connectDB();

  let payments = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .lean(true); // Converts Mongoose documents into plain objects

  // Convert MongoDB-specific data types to plain JSON-friendly values
  payments = payments.map((payment) => ({
    ...payment,
    _id: payment._id.toString(), // Convert ObjectId to string
    createdAt: payment.createdAt.toISOString(), // Convert Date to string
    updatedAt: payment.updatedAt.toISOString(), // Convert Date to string
  }));

  return payments;
};

//Update user details

export const updateProfile = async (newformData) => {
  console.log("-------------------------\n\n");
  console.log("newformData", newformData);
  console.log("-------------------------\n\n");
  await connectDB();
  console.log("----------------------- Inside Update ------------------");
  
  const { oldUsername, name, email } = newformData;
  console.log("username in Update Profile",name)

  // If username is being updated, check if it already exists
  if (oldUsername !== name) {
    let existingUser = await User.findOne({ name });
    if (existingUser) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email }, newformData);
    await Payment.updateMany({to_user:oldUsername},{to_user:name})
  } else {
    await User.updateOne({ email }, newformData);
    console.log("Updated");

    return { success: true };
  }
};
