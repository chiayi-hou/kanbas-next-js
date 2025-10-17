"use client"; 

import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation';

export default function People() 
{
  const pathname = usePathname();
  return (
    redirect(`${pathname}/Table`)
  )
}
