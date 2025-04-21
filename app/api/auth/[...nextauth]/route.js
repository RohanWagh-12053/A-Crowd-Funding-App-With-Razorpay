import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import User from '@/app/models/User';
import connectDB from '@/db/connectDB';
// Ensure MongoDB is connected once at startup


const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email }) {
      await connectDB(); // Connect to MongoDB once

      const userEmail = email || user.email; // Ensure email is taken correctly

      if (!userEmail) {
        throw new Error("Email not found. Please allow email access in GitHub.");
      }

      let currentUser = await User.findOne({ email: userEmail });
      console.log("Current User",currentUser)
      if (!currentUser) {
        console.log("-------------------Creating New User--------------")
        const newUser = new User({
          email: userEmail,
          username: userEmail.split('@')[0],
          name: user.name || "Anonymous",
        });
        await newUser.save();
      }
      else{
        user.name = currentUser.name;
      }
         
      return true; // Must return `true` for successful sign-in
    },

    async session({ session }) {
      console.log("Updating the session because its triggered... ")
      await connectDB(); 
      const updatedUser = await User.findOne({ email: session.user.email });

      if (updatedUser) {
        session.user.name = updatedUser.name;
        session.user.username = updatedUser.username; 
        session.user.profilePicture = updatedUser.profilePicture; 
      }

      return session;
    }

  },
});

export { handler as GET, handler as POST };
