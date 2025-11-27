"use client"; 

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import PeopleTable from "./Table";
import { useParams } from "next/navigation";
//import * as client from "../../../Account/client"
import * as client from "../../client"

export default function People() 
{
  const {cid} = useParams();
  const pathname = usePathname();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
   const users = await client.findUsersForCourse(cid as string);
   setUsers(users);
 };
 useEffect(() => {
   fetchUsersForCourse();
 }, []);

  return (
    <PeopleTable users={users} fetchUsers={fetchUsersForCourse} />
    //redirect(`${pathname}/Table`)
  )
}
