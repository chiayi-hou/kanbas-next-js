"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const pathname = usePathname();
  const {cid} = useParams();

    return (
      <div id="wd-courses-navigation"  className="wd list-group fs-5 rounded-0">
        {links.map((link)=>(
          <Link href={`/Courses/${cid}/${link}`} id={`wd-course-${link}-link`} key={link}
          className={`list-group-item border-0 ${pathname.includes(link)?"active":"text-danger"}`}>
          {link}
        </Link>
        ))}
      </div>
    );}
  