{/* Define a shared layout in this file to make things like navigation
    bar always appear in the same place */}

import { ReactNode } from "react";
import TOC from "./TOC";


export default function LabsLayout({
 children, /* function's input. the page.tsx in Labs */
}: Readonly<{ children: ReactNode }>) {
 return (
  <div>
    <div className="mb-3">
      <TOC/>
    </div>
    <div>{children}</div>
  </div>
);}
