"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
  ? ["Profile", ...(currentUser.role === "ADMIN" ? ["Users"] : [])]
  : ["Signin", "Signup"];
  const pathname = usePathname();
 return (
   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
    {links.map((link)=>(
      <Link key={link} href={link} className={`list-group-item border-0 ${pathname.endsWith(link)? "active":"text-danger"}`}> {link} </Link>
    ))}
    
   </div>
);}
