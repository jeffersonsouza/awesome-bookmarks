import bookmarksReducer from "./bookmarks";
import { combineReducers } from "redux";

const rootReducer = (combineReducers as any)({
  bookmarksReducer
});

export default rootReducer;
