/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};
const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {

    // called once sign in
    // should give an array of enrolled course as input
    setUserEnrollments: (state, action) => {
        state.enrollments = action.payload;
    },

    // enrollment formatted in  { "_id": "9", "user": "123", "course": "RS102" }
    addEnrollments: (state, {payload: enrollment}) => {
        state.enrollments = [...state.enrollments, enrollment] as any;
    },

    deleteEnrollment: (state, {payload: courseID}) => {
        state.enrollments = state.enrollments.filter(
            (e: any) => e.course !== courseID
        );
    }
  },
});
export const { setUserEnrollments, addEnrollments, deleteEnrollment} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;