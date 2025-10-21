

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
  }
}

export const authOption:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks:{
        async  signIn({user}) {
            await connectDb();

            const existingUser = await User.findOne({
                email:user.email
            })

            if(!existingUser){
                await User.create({
                    googleId:user.id,
                    name:user.name,
                    avatar:user.image,
                    email:user.email,
                    createdAt:Date.now()
                })
            }

            return true
        },

       async jwt({ token, user }) {
        await connectDb();
  
        const client = await User.findOne({ email: token.email });
        token.isAdmin = client?.isAdmin || false;
  
        return token;
},


        async session({session,token}){
          if(session.user){
            session.user.isAdmin=token.isAdmin
          }
            return session
        }
    },
    session:{
        strategy:"jwt"
    }


}

const handler = NextAuth(authOption)


export {handler as GET,handler as POST};