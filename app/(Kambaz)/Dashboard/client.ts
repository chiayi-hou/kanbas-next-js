/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
// 只要需要根據user display不同東西的都要用這個axiosWithCredentials
const axiosWithCredentials = axios.create({   baseURL: process.env.NEXT_PUBLIC_HTTP_SERVER, // https://kambaz-node-server-app-2zwg.onrender.com
withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

const ENROLLMENT_API = `${HTTP_SERVER}/api/enrollments`;


export const findEnrollmentForUser = async () => {
  const response = await axiosWithCredentials
  .get(`${ENROLLMENT_API}`);
  return response.data;
};

export const addEnrollmentForUser = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `/api/users/:uid/courses/${courseId}`);
    //`${ENROLLMENT_API}/${courseId}`);
  return response.data;
};

export const unEnrollForUser = async (courseId: string) => {
  try{
    const response = await axiosWithCredentials.delete(
   `/api/users/:uid/courses/${courseId}`);
      //`${ENROLLMENT_API}/${courseId}`);
    return response.data;
    } catch (error: any){
        console.error("unEnrollForUser axios error:", {
      message: error?.message,
      hasResponse: !!error?.response,
      hasRequest: !!error?.request,
      status: error?.response?.status,
      data: error?.response?.data,
    });
    throw error;
    }
};