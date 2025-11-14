"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      console.error(err);
      dispatch(setCurrentUser(null));
    }finally {
        // 不管成功或失敗都要關掉 pending
        console.log("[Session] setPending(false)");
        setPending(false);
      }
  };

  useEffect(() => {
    console.log("[Session] start fetchProfile");
    fetchProfile();
  }, [dispatch]);
  
  if (!pending) {
    return children;
  }

  if (pending) {
    // 這裡隨便你放個 Loading，比一片空白好
    return <div>Loading session...</div>;
  }
}

