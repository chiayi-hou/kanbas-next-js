"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";


export default function CoursesPage() {
 const { cid } = useParams();
 redirect(`/Courses/${cid}/Home`);
}