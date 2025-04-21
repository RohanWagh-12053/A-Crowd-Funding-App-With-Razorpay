"use client";
import React, { useState, useEffect } from "react";

import Footer from "../components/Footer";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { initiatePayment } from "@/actions/useractions";
import { fetchPayments } from "@/actions/useractions";
import { fetchUser } from "@/actions/useractions";
import { set } from "mongoose";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast,Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentPage = ({ params }) => {
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter()

 

  useEffect(() => {
    if (!params) return;

    Promise.resolve(params).then((resolvedParams) => {
      if (resolvedParams.username) {
        setUsername(decodeURI(resolvedParams.username));
      }
    });

    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, [params]);

  useEffect(() => {
    if (!username) return; // Ensure username is set before fetching payments

    const getData = async () => {
      const paymentsFromDB = await fetchPayments(decodeURI(username));
      setPayments(paymentsFromDB);
      console.log("Payments", paymentsFromDB);
      console.log("username",username)
    };

    getData();
  }, [username]); // Fetch payments only when username updates


  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      console.log("searchParams",searchParams)
      toast('Thanks For Donation!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        router.push(`/${username}`)
      //   console.log("username",username)
      //   console.log("session",session)
      //  console.log("searchParams",searchParams.toString())
    }
    else{
      console.log("Toast not Hit bro")
    }
  }, [username]);

  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (amount) => {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      console.error("Razorpay Key ID is missing!");
      alert("Payment system error. Please contact support.");
      return;
    }

    if (!razorpayLoaded) {
      console.error("Razorpay script not loaded yet.");
      return;
    }

    try {
      console.log("initiate Payment username",username)
      const fetchingOrderId = await initiatePayment(
        amount,
        username,
        paymentForm
      );

      if (!fetchingOrderId || !fetchingOrderId.id) {
        throw new Error("Failed to retrieve order ID from server.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Kundlik Wagh",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: fetchingOrderId.id,
        callback_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/razorpay`,
        prefill: {
          name: session?.user?.name || "Guest User",
          email: session?.user?.email || "guest@example.com",
          contact: "9000090000",
        },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="relative z-20 text-white">
        <div className="w-full flex flex-col items-center justify-center h-auto overflow-hidden">
          <div className="relative flex items-center justify-center w-full h-[20rem] overflow-hidden ">
            <Image
              className="relative"
              src="/donationCover.png"
              width={1400}
              height={10}
              alt="Cover"
              unoptimized
            />
          </div>
          <div className="profileInformation mt-4 flex gap-4">
            <div className="authuorProfilePic border rounded-full h-fit w-fit overflow-hidden">
            <Image
              className=""
              src="./profilePic.gif"
              width={70}
              height={70}
              alt="cover"
              unoptimized
            />
            </div>
            <div className="Stats">
            <div className="name font-semibold text-3xl">{username}</div>
            <div className="description">Lets Save Someones Life</div>
            <div className="statistics font-semibold text-[rgb(160,160,161)]">
              {payments.length} Payments ₹{payments.reduce((a,b)=>a+b.amount,0)/100} Total Funds Raised
            </div>
            </div>
          </div>
          <div className="SupportersAndPayment w-[80%] mt-4 flex gap-4">
            <div className="supporters flex flex-col gap-4 w-1/2 border rounded-xl p-6 bg-[linear-gradient(to_right,rgb(20,20,20)_0%,rgb(0,0,0)_20%,rgb(0,0,0)_100%)]">
              <h2 className="font-bold text-xl">Top 10 Donations</h2>
              <ul className="flex flex-col gap-2">
                {payments.slice(0, 10).map((element, index) => (
                 
                  <li key={index} className="flex items-center gap-2">
                    <Image
                      src={"/avatar.gif"}
                      unoptimized
                      width={30}
                      height={30}
                      alt="Avatar"
                    />
                    {element.name} Donated{" "}
                    <span className="font-bold">
                      ₹{Number(element.amount) / 100}
                    </span>{" "}
                    to You With message{" "}
                    <span className="font-bold">"{element.message}"</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="payment flex flex-col gap-4 w-1/2 border rounded-xl p-6 bg-[linear-gradient(to_right,rgb(20,20,20)_0%,rgb(0,0,0)_20%,rgb(0,0,0)_100%)]">
              <h2 className="font-bold text-xl">Make a Payment</h2>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  onChange={handleChange}
                  value={paymentForm.name}
                  name="name"
                  placeholder="Enter name"
                  className="w-full px-4 py-1 text-lg rounded-lg border bg-[rgb(20,20,20)]"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  value={paymentForm.message}
                  name="message"
                  placeholder="Enter message"
                  className="w-full px-4 py-1 text-lg rounded-lg border bg-[rgb(20,20,20)]"
                />
                <input
                  type="number"
                  onChange={handleChange}
                  value={paymentForm.amount}
                  name="amount"
                  placeholder="Enter Amount"
                  className="w-full px-4 py-1 text-lg rounded-lg border bg-[rgb(20,20,20)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    handlePayment(Number(paymentForm.amount) * 100)
                  }
                  disabled={
                    paymentForm.name.length < 3 ||
                    paymentForm.message.length < 3 ||
                    paymentForm.amount == ""
                  }
                  className="text-gray-900 disabled:bg-gradient-to-r disabled:from-slate-900 disabled:to-gray-300 bg-gradient-to-r from-teal-300 to-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Pay
                </button>
              </div>
              <div className="directPayOptions flex gap-4">
                {[10, 20, 30].map((value) => (
                  <button
                    key={value}
                    onClick={() => handlePayment(value * 100)}
                    className="px-4 py-1 text-lg rounded-lg border bg-[rgb(20,20,20)] hover:bg-[rgb(30,30,30)]"
                  >
                    Pay ${value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PaymentPage;
