/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
// 只要需要根據user display不同東西的都要用這個axiosWithCredentials
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;


export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const findAssignmentWithID = async (assignmentID: string) => {
 const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentID}`);
 return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentID: string) => {
 const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentID}`);
 return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};
