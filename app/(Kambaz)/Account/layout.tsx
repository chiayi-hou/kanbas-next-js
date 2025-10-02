import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
   <div id="wd-kambaz">
    <div className="d-flex">
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>
      <div className="flex-fill ms-2">
        {children}
      </div>
    </div>
  </div>
);}
