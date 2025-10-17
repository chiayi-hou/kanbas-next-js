"use client"
{/* 等待別的頁面navigate to this path, 把連結裡給的a,b拿出來用 */}
{/* 
    usePathname 是直接拿root以外的所有東西當一個str 
    useParams 是拿出指定的東西（資料夾加上[__]）
*/}
import { useParams } from "next/navigation";
export default function AddPathParameters() {
  const { a, b } = useParams();
  return (
    <div id="wd-add"> <h4>Add Path Parameters</h4>
      {a} + {b} = {parseInt(a as string) + parseInt(b as string)}
    </div>
  );
}
