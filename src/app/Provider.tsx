"use client"; // 👈 VERY IMPORTANT!

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

// 'use client'
// import { Provider } from "react-redux";
// import { store } from "@/store/store";
// import { ReactNode } from "react";

// export  function Providers({children}:{children:ReactNode}){

//     return <Provider store={ store }>{children}</Provider>;
// }
