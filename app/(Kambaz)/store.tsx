import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Courses/[cid]/Modules/reducer";
import assignmentsReducer from "./Courses/[cid]/Assignments/reducer";
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./Dashboard/reducer";

const store = configureStore({
 reducer: { coursesReducer, modulesReducer, accountReducer, assignmentsReducer, enrollmentReducer},
});
export default store;