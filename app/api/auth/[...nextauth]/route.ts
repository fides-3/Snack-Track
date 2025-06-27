// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt" as const,
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
//           return null;
//         }

//         return {
//             id:String(user?.id),
//             email:user.email,
//         };
//       },
//     }),
//   ],
//    callbacks: {
//     async session({ session, token}:{session:any;token:any}) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.email=token.email;
//         session.user.image=token.image;
//       }
//       return session;
//     },
//     async jwt({ token, user }:{token:any;user?:any}) {
//       if (user) {
//         token.id = user.id;
//         token.email=user.email;
//         token.image=user.image;
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Authorize called with:", { email: credentials?.email });
        
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.log("❌ User not found");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isPasswordValid) {
            console.log("❌ Invalid password");
            return null;
          }

          console.log("✅ User authenticated:", { id: user.id, email: user.email });

          return {
            id: String(user.id),
            email: user.email,
          
            image: user.image || null, // Add image field
          };
        } catch (error) {
          console.error("❌ Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      console.log("📝 Session callback - token:", token);
      
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      
      console.log("📝 Session callback - final session:", session);
      return session;
    },
    
    async jwt({ token, user }: { token: any; user?: any }) {
      console.log("🎫 JWT callback - user:", user, "token:", token);
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      
      console.log("🎫 JWT callback - final token:", token);
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debug in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };