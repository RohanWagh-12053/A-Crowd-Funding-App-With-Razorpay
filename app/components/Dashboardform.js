"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchUser, updateProfile } from "@/actions/useractions";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const UserForm = () => {
  const { data: session, update } = useSession();
  const [formDetails, setformDetails] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    coverPic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const getData = async (params) => {
    try {
      console.log("Fetching user data for:", params);

      let responseData = await fetchUser(params);

      if (!responseData) {
        console.error("Error: Received empty response from fetchUser.");
        return;
      }

      console.log("Fetched user data:", responseData);
      setformDetails((prev) => ({
        ...prev,
        name: responseData.name || "",
        email: responseData.email || "",
        username: responseData.username || "",
        profilePic: responseData.profilePicture || "",
        coverPic: responseData.coverPicture || "",
        razorpayId: responseData.razorpayId || "",
        razorpaySecret: responseData.razorpaySecret || "",
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (session && session.user?.name) {
      getData(session.user.name);
    }
  }, [session]);

  if (!session) {
    return <p>Loading...</p>; // ✅ Prevents crash when session is null
  }

  if (!formDetails) {
    return <p>Loading user details...</p>; // ✅ Prevents crash when formDetails is null
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setValue(name, value); // Update react-hook-form state
    setformDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log("formDetails",formDetails)
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevents page reload

    console.log("Form Data:", formDetails); // ✅ Logs the correct data
    console.log("Session Before Update:", session);

    let updatedData = {
      name: decodeURI(formDetails.name),
      email: formDetails.email,
      username: formDetails.username,
      profilePicture: formDetails.profilePic,
      coverPicture: formDetails.coverPic,
      razorpayId: formDetails.razorpayId,
      razorpaySecret: formDetails.razorpaySecret,
      oldUsername: session?.user?.name || "", // ✅ Ensure oldUsername is present
    };

    console.log("Updated Data before API Call:", updatedData); // ✅ Debugging log

    let response = await updateProfile(updatedData);

    if (response?.error) {
      alert(response.error);
      return;
    }

    console.log("Before await Update");

    await update({
      ...session,
      user: { ...session.user, ...updatedData }, // ✅ Instant UI update
    });

    console.log("After await Update");
    toast.success("Profile Updated", {
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
      
        <h1 className="text-3xl">Welcome to your Dashboard</h1>
        <form
          onSubmit={onSubmit}
          className="payment flex flex-col gap-2  w-1/2  border rounded-xl bg-[linear-gradient(to_right,rgb(20,20,20)_0%,rgb(0,0,0)_20%,rgb(0,0,0)_100%)] p-4"
        >
          <div>
            <label className="font-semibold text-[1.1rem]" htmlFor="name">
              Name:
            </label>
            <input
              value={formDetails.name}
              onChange={handleChange}
              name="name"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="name"
            />
          </div>

          <div>
            <label className="font-semibold text-[1.1rem]" htmlFor="email">
              Email:
            </label>
            <input
              value={formDetails.email}
              onChange={handleChange}
              name="email"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="email"
              type="email"
            />
          </div>

          <div>
            <label className="font-semibold text-[1.1rem]" htmlFor="username">
              Username:
            </label>
            <input
              value={formDetails.username}
              onChange={handleChange}
              name="username"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="username"
            />
          </div>

          <div>
            <label
              className="font-semibold text-[1.1rem]"
              htmlFor="profilePicture"
            >
              Profile Picture:
            </label>
            <input
              value={formDetails.profilePic}
              onChange={handleChange}
              name="profilePic"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="profilePic"
              type="file"
            />
          </div>

          <div>
            <label
              className="font-semibold text-[1.1rem]"
              htmlFor="coverPicture"
            >
              Cover Picture:
            </label>
            <input
              value={formDetails.coverPic}
              onChange={handleChange}
              name="coverPic"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="coverPic"
              type="file"
            />
          </div>

          <div>
            <label className="font-semibold text-[1.1rem]" htmlFor="razorpayId">
              PayPal ID:
            </label>
            <input
              value={formDetails.razorpayId}
              onChange={handleChange}
              name="razorpayId"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="razorpayId"
            />
          </div>

          <div>
            <label
              className="font-semibold text-[1.1rem]"
              htmlFor="razorpaySecret"
            >
              PayPal Secret:
            </label>
            <input
              value={formDetails.razorpaySecret}
              onChange={handleChange}
              name="razorpaySecret"
              className="w-full px-4 py-1 text-lg rounded-lg border border-[rgb(60,60,60)] bg-[rgb(20,20,20)]"
              id="razorpaySecret"
              type="password"
            />
          </div>

          <button
            className=" text-gray-900 bg-gradient-to-r from-teal-300 to-lime-300 hover:bg-gradient-to-r hover:from-lime-300 hover:to-teal-300  focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
