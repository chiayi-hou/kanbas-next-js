/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

// 只要需要根據user display不同東西的都要用這個axiosWithCredentials
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

// 修正這裡：不要雙斜線
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// 依照作業需求，quiz list/詳細都會用到登入狀態（faculty vs student），
// 這裡都改用 axiosWithCredentials

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return response.data;
};

export const findQuizWithID = async (quizID: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizID}`
  );
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizID: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizID}`
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};
