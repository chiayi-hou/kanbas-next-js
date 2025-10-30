"use client"
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { IoFlaskOutline } from "react-icons/io5";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Dashboard", icon: LiaBookSolid },
    { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",    icon: IoFlaskOutline },
  ];
  return (
    <div id="wd-kambaz-navigation">
      {/* position-fixed 這樣其他部分滑動這個都還是黏在螢幕上 */}
      <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 110 }}
              id="wd-kambaz-navigation">
        <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
              <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
        </ListGroupItem>
        <ListGroupItem  as={Link} href="/Account" 
                        className={`border-0 bg-black text-center ${pathname.includes("Account")?"bg-white text-danger":"bg-black text-white"}`}>
            <FaRegCircleUser className={`fs-1 ${pathname.includes("Account")? "text-danger":"text-white"}`} /><br />
            Account
        </ListGroupItem>
        {links.map((link) => (
          <ListGroupItem key={link.label} as={Link} href={link.path} 
                         className={`border-0 text-center bg-black ${pathname.includes(link.label)? "text-danger bg-white":"text-white bg-black"}`}>
            {link.icon({className:"fs-1 text-danger"})}
            <br />
            {link.label}
        </ListGroupItem>
        ))}
      </ListGroup>
    </div>
);}
