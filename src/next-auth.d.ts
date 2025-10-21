import { DefaultSession } from "next-auth";


declare module "next-auth"{
    interface session extends DefaultSession{
      user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean; 
    };
    }

    interface User{
        isAdmin?:boolean
    }

    interface JWT{
        isAdmin?:boolean
    }

}