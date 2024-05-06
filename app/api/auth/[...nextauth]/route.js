import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// create a handler that takes in options for the provider
console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // to get user session, need to sign in user
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      // serverless lamda
      // every next js route is servless which means that this
      // is a lambda funtion that opens up only when it gets called
      // and everytime it gets called it needs to spin up the
      // server and make connection to database
      await connectToDatabase();

      // check if user exists

      // if not, create a new user

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
