"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
  const pathname = usePathname();
  const tabName = pathname.split("/")[3];

  return (
    <span>
      {course?.name} {tabName && `> ${tabName}`}
    </span>
  );
}
