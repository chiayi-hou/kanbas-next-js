{/* Define a shared layout in this file to make things like navigation
    bar always appear in the same place */}

import { ReactNode } from "react";
import TOC from "./TOC";


export default function LabsLayout({
 children, /* function's input. the page.tsx in Labs */
}: Readonly<{ children: ReactNode }>) {
 return (
   <table>
     <tbody>
       <tr>
         <td valign="top" width="100px">
           <TOC />
         </td>
         <td valign="top">{children}</td>
       </tr>
     </tbody>
   </table>
);}
