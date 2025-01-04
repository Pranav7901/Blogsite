import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID from .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret from .env.local
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Random string for token encryption
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };