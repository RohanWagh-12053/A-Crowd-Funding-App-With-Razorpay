import User from "../models/User";
import { notFound } from "next/navigation";
import PaymentPage from "../components/PaymentPage";
import connectDB from "@/db/connectDB";

const UserPage = async ({ params }) => {
  await connectDB(); // Ensure database connection is established
  let newParams = await params
  const username = newParams?.username; 
  // Fetch user from database
  const user = await User.findOne({ name: username });

  if (!user) {
    console.log("Not found");
    notFound(); // Redirect to the not-found page
  }

  return (
    <>
      <PaymentPage params={params} />
    </>
  );
};

export default UserPage;
