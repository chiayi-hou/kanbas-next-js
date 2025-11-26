"use client"; 

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import PeopleTable from "./Table";
import * as client from "../../../Account/client"

export default function People() 
{
  const pathname = usePathname();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsersForCourse = async () => {
   const users = await client.findAllUsers();
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
